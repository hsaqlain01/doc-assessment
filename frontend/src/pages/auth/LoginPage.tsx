import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { login } from 'src/store/slices/authSlice';
import { LoginCredentials } from 'src/types/auth.types';
import { toast } from 'react-hot-toast';
import { FormInput } from 'src/components/common/FormInput';
import { loginValidations } from './utils/validations';
import { LoadingButton } from 'src/components/common/LoadingButton';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = async (data: LoginCredentials) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/dashboard');
      toast.success('Welcome back!');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-sm p-8'>
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-8'>
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <FormInput
            id='email'
            type='email'
            label='Email'
            register={register}
            rules={loginValidations['email']}
            error={errors.email}
            placeholder='Enter your email'
          />

          <FormInput
            id='password'
            type='password'
            label='Password'
            register={register}
            rules={loginValidations['password']}
            error={errors.password}
            placeholder='Enter your password'
          />

          <div>
            <LoadingButton type='submit' loading={loading}>
              Login
            </LoadingButton>
          </div>
        </form>

        {/* Register Link */}
        <p className='mt-4 text-center text-sm text-gray-600'>
          Don't have an account?{' '}
          <a href='/register' className='text-blue-500 hover:text-blue-600'>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};
