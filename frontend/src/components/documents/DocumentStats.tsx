import { useAppSelector } from "src/hooks/useRedux";
import { RootState } from "../../store/store";

export const DocumentStats = () => {
    const { stats } = useAppSelector((state: RootState) => state.document);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Total Documents</h3>
                <p className="text-3xl font-bold">{stats?.total || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
                <p className="text-3xl font-bold text-yellow-600">{stats?.pending || 0}</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2">Approved Documents</h3>
                <p className="text-3xl font-bold text-green-600">{stats?.approved || 0}</p>
            </div>
        </div>
    );
};