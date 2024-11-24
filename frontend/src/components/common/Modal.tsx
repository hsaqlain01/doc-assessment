import { Dialog } from '@headlessui/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <Dialog as='div' className='relative z-10' open={isOpen} onClose={onClose}>
      <div
        className='fixed inset-0 bg-black/25 transition-opacity'
        aria-hidden='true'
      />

      <div className='fixed inset-0 overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center'>
          <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
            <Dialog.Title className='text-lg font-medium leading-6 text-gray-900'>
              {title}
            </Dialog.Title>
            <div className='mt-4'>{children}</div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
