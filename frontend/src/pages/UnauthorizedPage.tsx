import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>401</h1>
        <p className='text-xl text-gray-600 mb-8'>
          You don't have permission to access this page
        </p>
        <Link to='/' className='text-blue-600 hover:text-blue-800 underline'>
          Return to Home
        </Link>
      </div>
    </div>
  );
};
