import { columns, requestsList, borrowStatusOptions, conditionOptions } from "../../../Data/AdminRequestsData";
import CustomTable from '@/components/CustomTable';

function BorrowRequests({ params }: { params: { request_id: string } }) {
    const INITIAL_VISIBLE_COLUMNS = ["id", 'name', "equipnamement", "email", "role", "borrow_status", "condition", "borrow_date", "return_date", 'actions'];

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Requests</h1>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    records={requestsList}
                    statusOptions={borrowStatusOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    role={'ADMIN'}
                    type={'REQUEST'}
                />
            </div>
        </>
    );
}

export default BorrowRequests;