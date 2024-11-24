import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { register as registerUser } from 'src/store/slices/authSlice';
import { Button } from 'src/components/common/Button';
import { RegisterData } from 'src/types/auth.types';
import { RootState } from 'src/store/store';
import { FormInput } from 'src/components/common/FormInput';
import { registerValidations } from './utils/validations';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData & { confirmPassword: string }>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData & { confirmPassword: string }) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await dispatch(registerUser(registerData)).unwrap();
      navigate('/dashboard');
      toast.success('Registration successful! Welcome!');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 sm:px-2 lg:px-3'>
      <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow'>
        <div>
          <h2 className='text-center text-3xl font-bold text-gray-900'>
            Create your account
          </h2>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <Link
              to='/login'
              className='font-medium text-blue-500 hover:text-blue-600'
            >
              already have an account?
            </Link>
          </p>
        </div>

        <form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div className='rounded-md shadow-sm space-y-4'>
            <FormInput
              id='name'
              label='Full Name'
              register={register}
              rules={registerValidations['name']}
              error={errors.name}
            />

            <FormInput
              id='email'
              type='email'
              label='Email address'
              register={register}
              rules={registerValidations['email']}
              error={errors.email}
            />

            <FormInput
              id='password'
              type='password'
              label='Password'
              register={register}
              rules={registerValidations['password']}
              error={errors.password}
            />

            <FormInput
              id='confirmPassword'
              type='password'
              label='Confirm Password'
              register={register}
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              error={errors.confirmPassword}
            />
          </div>

          {/* Password Requirements */}
          <div className='rounded-md bg-gray-50 p-4'>
            <div className='text-sm text-gray-700'>
              <p className='font-medium mb-2'>Password must contain:</p>
              <ul className='list-disc list-inside space-y-1'>
                <li>At least 8 characters</li>
                <li>At least one uppercase letter</li>
                <li>At least one lowercase letter</li>
                <li>At least one number</li>
              </ul>
            </div>
          </div>

          <div>
            <Button type='submit' loading={loading}>
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
