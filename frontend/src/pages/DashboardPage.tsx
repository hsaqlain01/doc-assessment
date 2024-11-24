import { useEffect } from 'react';
import { DocumentStats } from 'src/components/documents/DocumentStats';
import { useAppDispatch } from 'src/hooks/useRedux';
import { fetchDocumentStats } from 'src/store/slices/documentSlice';

export const DashboardPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocumentStats());
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-6'>Dashboard </h1>
      <DocumentStats />
    </div>
  );
};
