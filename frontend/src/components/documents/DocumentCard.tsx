import { Document } from 'src/types/document.types';
import { useAppSelector } from 'src/hooks/useRedux';
import Avatar from 'src/assets/svg/avatar';
import Clock from 'src/assets/svg/clock';
import Upload from 'src/assets/svg/upload';
import { RootState } from '../../store/store';
import { DocumentActions } from './DocumentActions';
import { useNavigate } from 'react-router-dom';

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const isManager = user?.role === 'MANAGER';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <div>
            <h3 className='text-lg font-medium text-gray-900'>
              {document.title}
            </h3>
            <p className='mt-1 text-sm text-gray-500'>{document.description}</p>
          </div>
          <div className='flex items-center space-x-3'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                document.status
              )}`}
            >
              {document.status}
            </span>
            <button
              onClick={() =>
                navigate(`/documents/${document._id}`, { state: { document } })
              }
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              title='View Details'
            >
              <svg
                className='w-5 h-5 text-gray-600 hover:text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                />
              </svg>{' '}
            </button>
          </div>
        </div>

        <div className='mt-4 space-y-2 text-sm text-gray-500'>
          <div className='flex items-center'>
            <Avatar />
            <span>Submitted by: {document.submittedBy.name}</span>
          </div>

          <div className='flex items-center'>
            <Clock />
            <span>Approver: {document.approver?.user?.name}</span>
          </div>

          {document.attachments.length > 0 && (
            <div className='flex items-center'>
              <Upload />
              <span>{document.attachments.length} attachment(s)</span>
            </div>
          )}
        </div>

        {document.approver.comment && (
          <div className='mt-4 p-4 bg-gray-50 rounded-md'>
            <p className='text-sm font-medium text-gray-900'>Comment:</p>
            <p className='mt-1 text-sm text-gray-600'>
              {document.approver.comment}
            </p>
          </div>
        )}

        {isManager && document.status === 'PENDING' && (
          <div className='mt-6 flex space-x-3'>
            <DocumentActions document={document} />
          </div>
        )}
      </div>
    </div>
  );
};
