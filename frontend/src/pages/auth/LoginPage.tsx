// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useAppDispatch } from 'src/hooks/useAppDispatch';
// // import { useAppDispatch } from 'src/hooks/redux';
// import { login } from "src/store/slices/authSlice";

// interface LoginForm {
//     email: string;
//     password: string;
// }

// export const LoginPage = () => {
//     const [error, setError] = useState('');
//     const navigate = useNavigate();
//     const dispatch = useAppDispatch();
//     const { register, handleSubmit } = useForm<LoginForm>();

//     const onSubmit = async (data: LoginForm) => {
//         try {
//             await dispatch(login(data)).unwrap();
//             navigate('/documents');
//         } catch (err: any) {
//             setError(err.message || 'Login failed');
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
//             <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//                 <h2 className="text-center text-3xl font-bold mb-8">Login</h2>

//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             {...register('email')}
//                             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             {...register('password')}
//                             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
//                         />
//                     </div>

//                     {error && (
//                         <div className="text-red-600 text-sm">{error}</div>
//                     )}

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700"
//                     >
//                         Login
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// src/pages/LoginPage.tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { login } from 'src/store/slices/authSlice';
import { LoginCredentials } from 'src/types/auth.types';
import { toast } from 'react-hot-toast';

export const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.auth);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginCredentials>();

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
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
                    Login
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email
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
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            {...register('password', {
                                required: 'Password is required'
                            })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your password"
                        />
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a
                        href="/register"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};