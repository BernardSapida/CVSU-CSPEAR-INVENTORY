'use client'

import { trpc } from '@/lib/trpc/client';
import { columns, requestsList, borrowStatusOptions, conditionOptions } from "../../../Data/AdminRequestsData";
import CustomTable from '@/components/CustomTable';

function BorrowRequests({ params }: { params: { request_id: string } }) {
    const INITIAL_VISIBLE_COLUMNS = ["id", "name", "email", "college", "role", "borrow_status", "condition", "borrow_date", "return_date", 'actions'];
    const getAdminBorrowRequest = trpc.adminBorrowRequest.getAdminBorrowRequest.useQuery();

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Borrow Requests</h1>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    records={getAdminBorrowRequest.data}
                    borrowStatusOptions={borrowStatusOptions}
                    conditionOptions={conditionOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    role={'Admin'}
                    type={'REQUEST'}
                    isLoading={getAdminBorrowRequest.isLoading}
                    getTableData={getAdminBorrowRequest}
                />
            </div>
        </>
    );
}

export default BorrowRequests;