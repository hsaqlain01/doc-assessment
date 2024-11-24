import { useState } from 'react';
import { useAppDispatch } from 'src/hooks/useRedux';
import { approveDocument, rejectDocument } from '../../store/slices/documentSlice';
import { toast } from 'react-hot-toast';
import { Document } from 'src/types/document.types';
import { Modal } from '../common/Modal';
import { DocumentReason } from './DocumentReason';

interface DocumentActionsProps {
    document: Document;
}

// export const DocumentActions = ({ document }: DocumentActionsProps) => {
//     const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);
//     const [loading, setLoading] = useState(false);

//     const dispatch = useAppDispatch();
//     const { user } = useAppSelector(state => state.auth);

//     const isManager = user?.role === 'MANAGER';
//     const isPending = document.status === 'PENDING';
//     const canAct = isManager && isPending;

//     const handleApprove = async (comment: string) => {
//         try {
//             setLoading(true);
//             await dispatch(approveDocument({ id: document._id, comment })).unwrap();
//             toast.success('Document approved successfully');
//             setModalType(null);
//         } catch (error: any) {
//             toast.error(error.message || 'Failed to approve document');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleReject = async (comment: string) => {
//         try {
//             setLoading(true);
//             await dispatch(rejectDocument({ id: document._id, comment })).unwrap();
//             toast.success('Document rejected successfully');
//             setModalType(null);
//         } catch (error: any) {
//             toast.error(error.message || 'Failed to reject document');
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (!canAct) return null;

//     const modalConfig = {
//         approve: {
//             title: 'Approve Document',
//             confirmText: 'Approve',
//             confirmButtonColor: 'bg-green-500 hover:bg-green-600 focus:ring-green-500',
//             onConfirm: handleApprove
//         },
//         reject: {
//             title: 'Reject Document',
//             confirmText: 'Reject',
//             confirmButtonColor: 'bg-red-500 hover:bg-red-600 focus:ring-red-500',
//             onConfirm: handleReject
//         }
//     };

//     return (
//         <>
//             {/* Action Buttons */}
//             <div className="flex gap-2">
//                 <button
//                     onClick={() => setModalType('approve')}
//                     className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
//                 >
//                     Approve
//                 </button>
//                 <button
//                     onClick={() => setModalType('reject')}
//                     className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
//                 >
//                     Reject
//                 </button>
//             </div>

//             {/* Action Modal */}
//             {modalType && (
//                 // <Modal
//                 //     isOpen={true}
//                 //     onClose={() => setModalType(null)}
//                 //     title={modalConfig[modalType].title}
//                 //     confirmText={modalConfig[modalType].confirmText}
//                 //     confirmButtonColor={modalConfig[modalType].confirmButtonColor}
//                 //     onConfirm={modalConfig[modalType].onConfirm}
//                 //     loading={loading}
//                 // />
//                 <Modal title={modalConfig[modalType].title} isOpen={true} onClose={() => setModalType(null)}>
//                     {/* <DocumentForm onClose={() => setShowCreateModal(false)} /> */}
//                     <DocumentReason
//                         title={modalConfig[modalType].title}
//                         onConfirm={modalConfig[modalType].onConfirm}
//                         confirmText={modalConfig[modalType].confirmText}
//                         confirmButtonColor={modalConfig[modalType].confirmButtonColor}
//                         loading={loading}
//                         onClose={() => setModalType(null)}
//                     />
//                 </Modal>
//             )}
//         </>
//     );
// };
export const DocumentActions = ({ document }: DocumentActionsProps) => {
    const [modalType, setModalType] = useState<'approve' | 'reject' | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    const handleAction = async (comment: string) => {
        if (!modalType) return;

        try {
            setLoading(true);
            if (modalType === 'approve') {
                await dispatch(approveDocument({ id: document._id, comment })).unwrap();
                toast.success('Document approved successfully');
            } else {
                await dispatch(rejectDocument({ id: document._id, comment })).unwrap();
                toast.success('Document rejected successfully');
            }
            handleClose();
        } catch (error: any) {
            toast.error(error.message || `Failed to ${modalType} document`);
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setModalType(null);
    };

    return (
        <>
            <div className="flex gap-2">
                <button
                    onClick={() => setModalType('approve')}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    Approve
                </button>
                <button
                    onClick={() => setModalType('reject')}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                    Reject
                </button>
            </div>

            {modalType && (
                <Modal
                    isOpen={!!modalType}
                    onClose={handleClose}
                    title={modalType === 'approve' ? 'Approve Document' : 'Reject Document'}
                >
                    <DocumentReason
                        type={modalType}
                        isLoading={loading}
                        onClose={handleClose}
                        onConfirm={handleAction}
                    />
                </Modal>
            )}
        </>
    );
};