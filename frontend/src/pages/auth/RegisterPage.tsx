// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { RegisterData } from 'src/types/auth.types';
// import { useAuth } from 'src/hooks/useAuth';
// import { LoadingButton } from 'src/components/shared/LoadingButton';

// export const RegisterPage = () => {
//     const [error, setError] = useState('');
//     const { register: registerUser } = useAuth();
//     const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterData>();

//     const password = watch('password');

//     const onSubmit = async (data: RegisterData) => {
//         try {
//             await registerUser(data);
//         } catch (err: any) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
//                 <div>
//                     <h2 className="text-center text-3xl font-extrabold text-gray-900">
//                         Create your account
//                     </h2>
//                 </div>
//                 <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
//                     <div className="rounded-md shadow-sm space-y-4">
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                                 Full Name
//                             </label>
//                             <input
//                                 id="name"
//                                 type="text"
//                                 {...register('name', {
//                                     required: 'Name is required',
//                                     minLength: {
//                                         value: 2,
//                                         message: 'Name must be at least 2 characters'
//                                     }
//                                 })}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                             {errors.name && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                                 Email address
//                             </label>
//                             <input
//                                 id="email"
//                                 type="email"
//                                 {...register('email', {
//                                     required: 'Email is required',
//                                     pattern: {
//                                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                         message: 'Invalid email address'
//                                     }
//                                 })}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                             {errors.email && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                                 Password
//                             </label>
//                             <input
//                                 id="password"
//                                 type="password"
//                                 {...register('password', {
//                                     required: 'Password is required',
//                                     minLength: {
//                                         value: 8,
//                                         message: 'Password must be at least 8 characters'
//                                     },
//                                     pattern: {
//                                         value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
//                                         message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
//                                     }
//                                 })}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             />
//                             {errors.password && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
//                             )}
//                         </div>

//                         <div>
//                             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                                 Confirm Password
//                             </label>
//                             {/* <input
//                                 id="confirmPassword"
//                                 type="password"
//                                 {...register('confirmPassword', {
//                                     required: 'Please confirm your password',
//                                     validate: value =>
//                                         value === password || 'The passwords do not match'
//                                 })}
//                                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                             /> */}
//                             {/* {errors.confirmPassword && (
//                                 <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
//                             )} */}
//                         </div>
//                     </div>

//                     {error && (
//                         <div className="rounded-md bg-red-50 p-4">
//                             <div className="text-sm text-red-700">{error}</div>
//                         </div>
//                     )}

//                     <div>
//                         <LoadingButton
//                             type="submit"
//                             className="w-full py-2"
//                         >
//                             Create Account
//                         </LoadingButton>
//                     </div>

//                     <div className="text-center">
//                         <Link
//                             to="/login"
//                             className="text-sm text-blue-600 hover:text-blue-500"
//                         >
//                             Already have an account? Sign in
//                         </Link>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { register as registerUser } from 'src/store/slices/authSlice';
import { LoadingButton } from 'src/components/common/LoadingButton';
import { toast } from 'react-hot-toast';
import { RegisterData } from 'src/types/auth.types';
import { RootState } from 'src/store/store';
// import { RegisterData } from '../types';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.auth);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900">
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link
                            to="/login"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            already have an account?
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                {...register('name', {
                                    required: 'Full name is required',
                                    minLength: {
                                        value: 2,
                                        message: 'Name must be at least 2 characters long'
                                    }
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address'
                                    }
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters long'
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
                                    }
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: 'Please confirm your password',
                                    validate: value =>
                                        value === password || 'Passwords do not match'
                                })}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="rounded-md bg-gray-50 p-4">
                        <div className="text-sm text-gray-700">
                            <p className="font-medium mb-2">Password must contain:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter</li>
                                <li>At least one lowercase letter</li>
                                <li>At least one number</li>
                            </ul>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <LoadingButton
                            type="submit"
                            loading={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </LoadingButton>
                    </div>
                </form>

                {/* Privacy Policy and Terms */}
                <div className="text-sm text-center text-gray-600">
                    By registering, you agree to our{' '}
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    );
};