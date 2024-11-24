import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { fetchDocuments } from 'src/store/slices/documentSlice';
import { DocumentCard } from 'src/components/documents/DocumentCard';
import { RootState } from 'src/store/store';
import { Modal } from 'src/components/common/Modal';
import { DocumentForm } from 'src/components/documents/DocumentForm';

export const DocumentListPage = () => {
  const dispatch = useAppDispatch();
  const { documents, loading } = useAppSelector(
    (state: RootState) => state.document
  );

  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  if (loading && !documents?.length) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <div className='p-4 md:p-6 max-w-7xl mx-auto'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6'>
        <h1 className='text-xl md:text-2xl font-bold'>Documents</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className='w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
        >
          Create Document
        </button>
      </div>

      <div className='grid gap-4'>
        {documents.map((doc) => (
          <DocumentCard key={doc._id} document={doc} />
        ))}
      </div>

      {showCreateModal && (
        <Modal
          title='Create Document'
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        >
          <DocumentForm onClose={() => setShowCreateModal(false)} />
        </Modal>
      )}
    </div>
  );
};
