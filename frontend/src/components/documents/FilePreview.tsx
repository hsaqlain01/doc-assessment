import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface Attachment {
    filename: string;
    originalName: string;
    path: string;
    mimeType: string;
    _id: string;
}

interface FilePreviewProps {
    attachments: Attachment[];
}

export const FilePreview = ({ attachments }: FilePreviewProps) => {
    const [selectedAttachment, setSelectedAttachment] = useState(attachments[0]);
    const baseUrl = 'http://localhost:4000';

    const handleImageError = () => {
        toast.error('Failed to load image');
    };

    const isImage = (mimeType: string) => {
        return mimeType.startsWith('image/');
    };

    return (
        <div className="space-y-4">
            {/* Main Preview Area */}
            <div className="border rounded-lg overflow-hidden bg-gray-50">
                {isImage(selectedAttachment.mimeType) ? (
                    <div className="flex justify-center p-4">
                        <img
                            src={`${baseUrl}/${selectedAttachment.path}`}
                            alt={selectedAttachment.originalName}
                            className="max-w-full h-auto max-h-[500px] object-contain"
                            onError={handleImageError}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-8">
                        <div className="text-center">
                            <svg
                                className="w-12 h-12 mx-auto text-gray-400"
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
                            <p className="mt-2 text-sm text-gray-600">
                                Preview not available for this file type
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Thumbnails/File List */}
            {attachments.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                    {attachments.map((attachment) => (
                        <button
                            key={attachment._id}
                            onClick={() => setSelectedAttachment(attachment)}
                            className={`flex-shrink-0 relative ${selectedAttachment._id === attachment._id
                                ? 'ring-2 ring-blue-500'
                                : ''
                                }`}
                        >
                            {isImage(attachment.mimeType) ? (
                                <img
                                    src={`${baseUrl}/${attachment.path}`}
                                    alt={attachment.originalName}
                                    className="w-20 h-20 object-cover rounded-md"
                                    onError={handleImageError}
                                />
                            ) : (
                                <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-md">
                                    <svg
                                        className="w-8 h-8 text-gray-400"
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
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            )}

            {/* File Information */}
            <div className="text-sm text-gray-500">
                <p>File name: {selectedAttachment.originalName}</p>
                <p>Type: {selectedAttachment.mimeType}</p>
            </div>
        </div>
    );
};