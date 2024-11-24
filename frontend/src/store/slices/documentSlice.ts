import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as documentService from '../../services/documentService';
import { Document, DocumentStats } from 'src/types/document.types';
import { RootState } from '../store';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  stats: DocumentStats | null;
  loading: boolean;
  isFetchingStats: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  stats: null,
  loading: false,
  isFetchingStats: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
};

export const fetchDocuments = createAsyncThunk(
  'document/fetchAll',
  async () => {
    const response = await documentService.getAllDocuments();
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.document.loading;
    },
  }
);

export const fetchDocumentById = createAsyncThunk(
  'document/fetchById',
  async (id: string) => {
    const response = await documentService.getDocumentById(id);
    return response.data;
  }
);

export const createDocument = createAsyncThunk(
  'document/create',
  async (formData: FormData) => {
    const response = await documentService.createDocument(formData);
    return response.data;
  }
);

export const approveDocument = createAsyncThunk(
  'document/approve',
  async ({ id, comment }: { id: string; comment: string }) => {
    const response = await documentService.approveDocument(id, comment);
    return response.data;
  }
);

export const rejectDocument = createAsyncThunk(
  'document/reject',
  async ({ id, comment }: { id: string; comment: string }) => {
    const response = await documentService.rejectDocument(id, comment);
    return response.data;
  }
);

export const fetchDocumentStats = createAsyncThunk(
  'document/fetchStats',
  async () => {
    const response = await documentService.getDocumentStats();
    return response.data;
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      return !state.document.isFetchingStats;
    },
  }
);

const documentSlice = createSlice({
  name: 'document',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Documents
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload.documents;
        state.totalPages = Math.ceil(
          action.payload.pagination.total / action.payload.pagination.limit
        );
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch documents';
      })

      // Fetch Document by ID
      .addCase(fetchDocumentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocumentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDocument = action.payload;
      })
      .addCase(fetchDocumentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch document';
      })

      // Create Document
      .addCase(createDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.unshift(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create document';
      })

      .addCase(approveDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(
          (doc) => doc._id === action.payload._id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        if (state.currentDocument?._id === action.payload._id) {
          state.currentDocument = action.payload;
        }
      })

      // Reject Document
      .addCase(rejectDocument.fulfilled, (state, action) => {
        const index = state.documents.findIndex(
          (doc) => doc._id === action.payload._id
        );
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
        if (state.currentDocument?._id === action.payload._id) {
          state.currentDocument = action.payload;
        }
      })

      // Fetch Stats
      .addCase(fetchDocumentStats.pending, (state) => {
        state.isFetchingStats = true;
      })
      .addCase(fetchDocumentStats.fulfilled, (state, action) => {
        state.stats = action.payload;
        state.isFetchingStats = false;
      })
      .addCase(fetchDocumentStats.rejected, (state) => {
        state.isFetchingStats = false;
      });
  },
});

export const { clearError, setCurrentPage } = documentSlice.actions;
export default documentSlice.reducer;
