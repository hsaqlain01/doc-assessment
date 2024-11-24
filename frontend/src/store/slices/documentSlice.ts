import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as documentService from '../../services/documentService';
import { Document, DocumentStats } from 'src/types/document.types';

interface DocumentState {
  documents: Document[];
  currentDocument: Document | null;
  stats: DocumentStats | null;
  loading: boolean;
  isCreating: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
}

const initialState: DocumentState = {
  documents: [],
  currentDocument: null,
  stats: null,
  loading: false,
  error: null,
  isCreating: false,
  currentPage: 1,
  totalPages: 1,
};

export const fetchDocuments = createAsyncThunk(
  'document/fetchAll',
  async () => {
    const response = await documentService.getAllDocuments();
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

      // Create Document
      .addCase(createDocument.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createDocument.fulfilled, (state, action) => {
        state.isCreating = false;
        state.documents.unshift(action.payload);
      })
      .addCase(createDocument.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.error.message || 'Failed to create document';
      })

      .addCase(approveDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveDocument.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the approved document from the list
        state.documents = state.documents.filter(
          (doc) => doc._id !== action.payload._id
        );
        // Update current document if it's the one being approved
        if (state.currentDocument?._id === action.payload._id) {
          state.currentDocument = action.payload;
        }
      })
      .addCase(approveDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to approve document';
      })

      // Reject Document
      .addCase(rejectDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectDocument.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the rejected document from the list
        state.documents = state.documents.filter(
          (doc) => doc._id !== action.payload._id
        );
        // Update current document if it's the one being rejected
        if (state.currentDocument?._id === action.payload._id) {
          state.currentDocument = action.payload;
        }
      })
      .addCase(rejectDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to reject document';
      })

      .addCase(fetchDocumentStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      });
  },
});

export const { clearError, setCurrentPage } = documentSlice.actions;
export default documentSlice.reducer;
