import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { DocumentActions } from 'src/components/documents/DocumentActions';
import { FilePreview } from 'src/components/documents/FilePreview';
import { Document } from 'src/types/document.types';

interface LocationState {
    document: Document;
}

export const DocumentDetailsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { document } = location.state as LocationState;

    // If no document in state, redirect to documents list
    if (!document) {
        return <Navigate to="/documents" replace />;
    }

    if (!document) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Document Not Found</h3>
                    <button
                        onClick={() => navigate('/documents')}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Back to Documents
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                            {document.title}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Document ID: {document?._id}
                        </p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
              ${document.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                document.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'}`}
                        >
                            {document.status}
                        </span>
                        {document.status === 'PENDING' && (
                            <DocumentActions document={document} />
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Document Info */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Document Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Submitted By</h3>
                            <p className="mt-1 text-sm text-gray-900">{document.submittedBy.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Submitted Date</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(document.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Approver</h3>
                            <p className="mt-1 text-sm text-gray-900">{document.approver.user?.name}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                            <p className="mt-1 text-sm text-gray-900">
                                {new Date(document.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">Description</h2>
                    <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {document.description}
                    </p>
                </div>

                {/* Attachments */}
                {document.attachments && document.attachments.length > 0 && (
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Attachments</h2>
                        <FilePreview attachments={document.attachments} />
                    </div>
                )}

                {/* Approval History */}
                {document.approver.comment && (
                    <div className="p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4">Approval History</h2>
                        <div className="bg-gray-50 rounded-md p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center
                    ${document.status === 'APPROVED' ? 'bg-green-100' :
                                            document.status === 'REJECTED' ? 'bg-red-100' : 'bg-yellow-100'}`}
                                    >
                                        <span className="text-sm font-medium">
                                            {document.approver.user.name.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-900">
                                        {document.approver.user.name}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {document.approver.comment}
                                    </p>
                                    <p className="mt-1 text-xs text-gray-400">
                                        {new Date(document.approver.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Back Button */}
            <div className="mt-6">
                <button
                    onClick={() => navigate('/documents')}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back to Documents
                </button>
            </div>
        </div>
    );
};