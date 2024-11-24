import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useRedux';

interface NavItem {
    path: string;
    name: string;
    icon: JSX.Element;
    roles?: string[];
}

const Sidebar = () => {
    const { user } = useAppSelector(state => state.auth);

    const navItems: NavItem[] = [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            path: '/documents',
            name: 'Documents',
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
    ];

    const isAllowed = (item: NavItem) => {
        if (!item.roles) return true;
        return item.roles.includes(user?.role || '');
    };

    return (
        <div className="w-64 bg-white h-[calc(100vh-4rem)] border-r border-gray-200">
            <div className="flex flex-col p-4">
                {navItems.map((item) =>
                    isAllowed(item) ? (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-4 py-2 mt-1 rounded-md transition-colors ${isActive
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