import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full text-center'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>404</h1>
        <p className='text-xl text-gray-600 mb-8'>Page not found</p>
        <Link to='/' className='text-blue-600 hover:text-blue-800 underline'>
          Return to Home
        </Link>
      </div>
    </div>
  );
};
