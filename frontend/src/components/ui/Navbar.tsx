import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { logout } from 'src/store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className='bg-white border-b border-gray-200'>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex items-center'>
            <span className='text-xl font-semibold text-gray-800'>
              Document Approval
            </span>
          </div>

          <div className='flex items-center gap-4'>
            {/* User Profile */}
            <div className='flex items-center'>
              <span className='hidden md:block text-sm text-gray-700 mr-2'>
                {user?.name}
              </span>
              <button className='p-1 rounded-full hover:bg-gray-100'>
                <div className='w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center'>
                  <span className='text-white text-sm'>
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className='px-1 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md'
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
