import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './routes/ProtectedRoute';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { DashboardPage } from 'src/pages/DashboardPage';
import { DocumentListPage } from 'src/pages/documents/DocumentListPage';

// Error Pages
import { NotFoundPage } from './pages/NotFoundPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { DocumentDetailsPage } from './pages/documents/DocumentDetailsPage';

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<ProtectedRoute authRequired={false} />}>
        <Route element={<AuthLayout />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute authRequired={true} />}>
        <Route element={<DashboardLayout />}>
          <Route path='/' element={<Navigate to='/dashboard' replace />} />

          <Route path='/dashboard' element={<DashboardPage />} />

          {/* Document Routes */}
          <Route path='/documents'>
            <Route index element={<DocumentListPage />} />
            <Route path=":id" element={<DocumentDetailsPage />} />
          </Route>
        </Route>
      </Route>

      {/* Error Routes */}
      <Route path='/unauthorized' element={<UnauthorizedPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
