import ViewIcon from 'src/assets/svg/view';
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
      <div className='p-4 md:p-6'>
        <div className='flex justify-between items-start gap-4'>
          <div className='max-w-3xl'>
            <h3 className='text-base md:text-lg font-medium text-gray-900'>
              {document.title}
            </h3>
            <div className='mt-2'>
              <p className='text-sm text-gray-500 lg:break-words'>
                {document.description}
              </p>
            </div>
          </div>
          <div className='flex items-start space-x-3 flex-shrink-0'>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(
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
              <ViewIcon />
            </button>
          </div>
        </div>

        <div className='mt-4 space-y-2 text-sm text-gray-500'>
          <div className='flex items-center gap-2 overflow-hidden'>
            <Avatar />
            <span className='truncate'>
              Submitted by: {document.submittedBy.name}
            </span>
          </div>

          <div className='flex items-center gap-2 overflow-hidden'>
            <Clock />
            <span className='truncate'>
              Approver: {document.approver?.user?.name}
            </span>
          </div>

          {document.attachments.length > 0 && (
            <div className='flex items-center gap-2'>
              <Upload />
              <span>{document.attachments.length} attachment(s)</span>
            </div>
          )}
        </div>

        {document.approver.comment && (
          <div className='mt-4 p-3 md:p-4 bg-gray-50 rounded-md'>
            <p className='text-sm font-medium text-gray-900'>Comment:</p>
            <p className='mt-1 text-sm text-gray-600 line-clamp-3'>
              {document.approver.comment}
            </p>
          </div>
        )}

        {isManager && document.status === 'PENDING' && (
          <div className='mt-4 md:mt-6 flex flex-wrap gap-2'>
            <DocumentActions document={document} />
          </div>
        )}
      </div>
    </div>
  );
};
