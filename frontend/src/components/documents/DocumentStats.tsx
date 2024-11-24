import { useAppSelector } from 'src/hooks/useRedux';
import { RootState } from '../../store/store';
import { memo } from 'react';
import { UserRole } from 'src/types/common.types';

export const DocumentStats = memo(() => {
  const { stats } = useAppSelector((state: RootState) => state.document);
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className='space-y-4'>
      {user?.role !== UserRole.USER && (
        <div className='bg-blue-50 border-l-4 border-blue-500 p-4 mb-6'>
          <div className='flex items-center'>
            <p className='text-sm text-blue-700'>
              These statistics are personalized and only show documents
              associated with your account
            </p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-lg font-semibold mb-2'>Total Documents</h3>
          <p className='text-3xl font-bold'>{stats?.total || 0}</p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-lg font-semibold mb-2'>Pending Approvals</h3>
          <p className='text-3xl font-bold text-yellow-600'>
            {stats?.pending || 0}
          </p>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-lg font-semibold mb-2'>Approved Documents</h3>
          <p className='text-3xl font-bold text-green-600'>
            {stats?.approved || 0}
          </p>
        </div>
      </div>
    </div>
  );
});
