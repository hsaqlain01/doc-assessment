// src/components/ui/Toast.tsx
import { toast as hotToast } from 'react-hot-toast';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
}

const toastStyles = {
  default: 'bg-white',
  success: 'bg-green-50 border-green-500',
  error: 'bg-red-50 border-red-500',
  warning: 'bg-yellow-50 border-yellow-500',
};

export const toast = ({
  title,
  description,
  variant = 'default',
}: ToastOptions) => {
  hotToast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full ${
          toastStyles[variant]
        } shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className='flex-1 w-0 p-4'>
          <div className='flex items-start'>
            <div className='ml-3 flex-1'>
              <p className='text-sm font-medium text-gray-900'>{title}</p>
              {description && (
                <p className='mt-1 text-sm text-gray-500'>{description}</p>
              )}
            </div>
          </div>
        </div>
        <div className='flex border-l border-gray-200'>
          <button
            onClick={() => hotToast.dismiss(t.id)}
            className='w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 hover:text-gray-500 focus:outline-none'
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      position: 'top-right',
    }
  );
};
