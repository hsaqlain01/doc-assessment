import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  authRequired?: boolean;
}

export const ProtectedRoute = ({
  authRequired = true,
}: ProtectedRouteProps) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  const location = useLocation();

  // For routes that require authentication
  if (authRequired) {
    if (!isAuthenticated) {
      // Redirect to login with the attempted location
      return <Navigate to='/login' state={{ from: location }} replace />;
    }
    return <Outlet />;
  }

  // For public routes (login, register)
  if (isAuthenticated && location.pathname === '/login') {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
};
