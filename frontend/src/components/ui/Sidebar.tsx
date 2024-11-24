import { NavLink } from 'react-router-dom';
import DocumentIcon from 'src/assets/svg/document';
import Home from 'src/assets/svg/home';
import { useAppSelector } from 'src/hooks/useRedux';

interface NavItem {
  path: string;
  name: string;
  icon: JSX.Element;
  roles?: string[];
}

const Sidebar = () => {
  const { user } = useAppSelector((state) => state.auth);

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <Home />,
    },
    {
      path: '/documents',
      name: 'Documents',
      icon: <DocumentIcon />,
    },
  ];

  const isAllowed = (item: NavItem) => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  };

  return (
    <div className='w-64 bg-white h-[calc(100vh-4rem)] border-r border-gray-200'>
      <div className='flex flex-col p-4'>
        {navItems.map((item) =>
          isAllowed(item) ? (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 mt-1 rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Sidebar;
