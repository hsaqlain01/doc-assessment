import { useState } from 'react';

interface DocumentReasonProps {
  isLoading: boolean;
  onClose: () => void;
  onConfirm: (comment: string) => Promise<void>;
  type: 'approve' | 'reject';
}

export const DocumentReason = ({
  isLoading,
  onClose,
  onConfirm,
  type,
}: DocumentReasonProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onConfirm(comment);
  };

  const config = {
    approve: {
      buttonText: 'Approve',
      buttonClass: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
      loadingText: 'Approving...',
      placeholder: 'Enter approval comment',
    },
    reject: {
      buttonText: 'Reject',
      buttonClass: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
      loadingText: 'Rejecting...',
      placeholder: 'Enter rejection reason',
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div>
          <label
            htmlFor='comment'
            className='block text-sm font-medium text-gray-700'
          >
            Comment
            <span className='text-red-500 ml-1'>*</span>
          </label>
          <textarea
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                     focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2'
            rows={4}
            placeholder={config[type].placeholder}
            required
            disabled={isLoading}
          />
          <p className='mt-1 text-sm text-gray-500'>
            Please provide a {type === 'approve' ? 'comment' : 'reason'} for
            your decision.
          </p>
        </div>

        <div className='flex justify-end gap-3 pt-4'>
          <button
            type='button'
            onClick={onClose}
            disabled={isLoading}
            className='px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                     border-gray-300 rounded-md hover:bg-gray-50 
                     focus:outline-none focus:ring-2 focus:ring-offset-2 
                     focus:ring-blue-500 disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            type='submit'
            disabled={isLoading || !comment.trim()}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${config[type].buttonClass}`}
          >
            {isLoading ? 'Processing...' : config[type].buttonText}
          </button>
        </div>
      </div>
    </form>
  );
};
