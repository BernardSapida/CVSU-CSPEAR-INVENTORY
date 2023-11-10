import EquipmentTable from '@/components/admin/borrow-requests/EquipmentTable';
import { columns, requestsList, borrowStatusOptions, conditionOptions } from "../../../Data/AdminRequestsData";

function BorrowRequests({ params }: { params: { request_id: string } }) {
    const { request_id } = params;

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Requests</h1>
            <hr />
            <div className='mt-5'>
                <EquipmentTable
                    columns={columns}
                    requestsList={requestsList}
                    conditionOptions={conditionOptions}
                    borrowStatusOptions={borrowStatusOptions}
                />
            </div>
        </>
    );
}

export default BorrowRequests;