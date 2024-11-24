import {
  UseFormRegister,
  FieldValues,
  FieldError,
  RegisterOptions,
  Path,
} from 'react-hook-form';

interface FormInputProps<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  label: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegister<TFormValues>;
  rules?: RegisterOptions<TFormValues, Path<TFormValues>>;
  error?: FieldError;
  className?: string;
}

export const FormInput = <TFormValues extends FieldValues>({
  id,
  label,
  type = 'text',
  placeholder,
  register,
  rules,
  error,
  className = '',
}: FormInputProps<TFormValues>) => {
  return (
    <div className='space-y-1'>
      <label
        htmlFor={id}
        className='block text-sm font-medium text-gray-700 mb-1'
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, rules)}
        className={`
          mt-1 block w-full px-3 py-2 
          border border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error.message}</p>}
    </div>
  );
};
