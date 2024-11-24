import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from 'src/hooks/useRedux';
// import { useAppSelector } from 'src/hooks/useAppSelector';
// import { useAppSelector } from 'src/hooks/redux';
import { RootState } from 'src/store/store';
import { UserRole } from 'src/types/common.types';
// import { UserRole } from 'src/types/auth.types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({
    children,
    allowedRoles,
}: ProtectedRouteProps) => {
    const { user, token } = useAppSelector((state: RootState) => state.auth);
    const location = useLocation();

    if (!token || !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role as UserRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <>{children}</>;
};