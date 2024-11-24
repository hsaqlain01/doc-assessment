// import { Routes, Route, Navigate } from 'react-router-dom';
// import { LoginPage } from './pages/auth/LoginPage';
// import { ProtectedRoute } from './router/ProtectedRoute';
// import { MainLayout } from './router/MainLayout';
// import { DashboardPage } from './pages/DocumentPage';
// import { DocumentListPage } from './pages/documents/DocumentListPage';
// import { RegisterPage } from './pages/auth/RegisterPage';

// export const Router = () => {
//     return (
//         // <Routes>
//         //     <Route path="/login" element={<LoginPage />} />
//         //     <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
//         //         <Route index element={<DashboardPage />} />
//         //         <Route path="documents" element={<DocumentListPage />} />
//         //         {/* <Route path="documents/:id" element={<DocumentDetailsPage />} /> */}
//         //         {/* <Route path="profile" element={<ProfilePage />} /> */}
//         //     </Route>
//         // </Routes>
//         <Routes>
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />

//             <Route path="/" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
//                 <Route index element={<Navigate to="/dashboard" replace />} />
//                 <Route path="dashboard" element={<DashboardPage />} />
//                 <Route path="documents" element={<DocumentListPage />} />
//                 {/* <Route path="documents/:id" element={<DocumentDetailsPage />} />
//                 <Route path="profile" element={<ProfilePage />} /> */}
//             </Route>

//             <Route path="*" element={<Navigate to="/login" replace />} />
//         </Routes>
//     );
// };

import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
// import { ProtectedRoute } from './routes/ProtectedRoute';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';

// Dashboard Pages
import { DashboardPage } from 'src/pages/DashboardPage';
import { DocumentListPage } from 'src/pages/documents/DocumentListPage';
// import { DocumentDetailsPage } from './pages/DocumentDetailsPage';
// import { ProfilePage } from './pages/ProfilePage';

// Error Pages
import { NotFoundPage } from './pages/NotFoundPage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';

const Router = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<DashboardLayout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Document Routes */}
                <Route path="/documents">
                    <Route index element={<DocumentListPage />} />
                    {/* <Route path=":id" element={<DocumentDetailsPage />} /> */}
                </Route>

                {/* Profile Route */}
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
            </Route>

            {/* Error Routes */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default Router;