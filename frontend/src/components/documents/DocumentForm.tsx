import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { createDocument } from 'src/store/slices/documentSlice';
import { FormInput } from '../common/FormInput';
import { RootState } from 'src/store/store';

interface DocumentFormData {
  title: string;
  description: string;
  attachments?: FileList;
}

export const DocumentForm = ({ onClose }: { onClose: () => void }) => {
  const { isCreating } = useAppSelector((state: RootState) => state.document);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DocumentFormData>();

  const onSubmit = async (data: DocumentFormData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);

    if (data.attachments) {
      Array.from(data.attachments).forEach((file) => {
        formData.append('attachments', file);
      });
    }

    await dispatch(createDocument(formData)).unwrap();
    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div>
        <FormInput
          id='title'
          type='text'
          label='Title'
          register={register}
          rules={{
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long',
            },
          }}
          error={errors.title}
        />
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <textarea
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Title must be at least 10 characters long',
            },
          })}
          rows={4}
          className='mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500'
        />
        {errors.description && (
          <p className='mt-1 text-sm text-red-600'>
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Attachments
        </label>
        <input
          type='file'
          accept='.jpg,.jpeg,.png'
          multiple
          {...register('attachments')}
          className='mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
        />
      </div>

      <div className='flex justify-end space-x-3'>
        <button
          type='button'
          onClick={onClose}
          className='px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Cancel
        </button>
        <button
          type='submit'
          disabled={isCreating}
          className='px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50'
        >
          {isCreating ? 'Creating...' : 'Create Document'}
        </button>
      </div>
    </form>
  );
};
