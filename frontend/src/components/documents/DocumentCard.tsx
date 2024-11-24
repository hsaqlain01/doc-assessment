import { Document } from 'src/types/document.types';
import { RootState } from '../../store/store';
import { useAppSelector } from 'src/hooks/useRedux';
import { DocumentActions } from './DocumentActions';

interface DocumentCardProps {
    document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const isManager = user?.role === 'MANAGER';

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900">{document.title}</h3>
                        <p className="mt-2 text-gray-600">{document.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${document.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        document.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                        }`}>
                        {document.status}
                    </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>Submitted by: {document.submittedBy.name}</span>
                    </div>

                    <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Approver: {document.approver?.user?.name}</span>
                    </div>

                    {document.attachments.length > 0 && (
                        <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            <span>{document.attachments.length} attachment(s)</span>
                        </div>
                    )}
                </div>

                {document.approver.comment && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                        <p className="text-sm font-medium text-gray-900">Comment:</p>
                        <p className="mt-1 text-sm text-gray-600">{document.approver.comment}</p>
                    </div>
                )}

                {isManager && document.status === 'PENDING' && (
                    <div className="mt-6 flex space-x-3">
                        <DocumentActions document={document} />
                    </div>
                )}
            </div>
        </div>
    );
};