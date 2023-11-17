'use client'

import CustomTable from '@/components/CustomTable';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';
import { Skeleton } from '@nextui-org/react';
import { useContext } from 'react';
import { borrowStatusOptions, columns, conditionOptions } from "../../../Data/AdminRequestsData";

function BorrowRequests() {
    const { user } = useContext(UserContext);
    const INITIAL_VISIBLE_COLUMNS = ["name", "email", "college", "role", "borrow_status", "condition", "borrow_date", "return_date", 'actions'];
    const getBorrowRequests = trpc.borrowRequest.getBorrowRequests.useQuery();
    const borrowRequestsList = getBorrowRequests.data;

    return (
        <>
            <Skeleton className='my-6 rounded-lg w-max' isLoaded={!getBorrowRequests.isLoading}>
                <h1 className="text-3xl font-semibold">Borrow Requests</h1>
            </Skeleton>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    records={borrowRequestsList}
                    borrowStatusOptions={borrowStatusOptions}
                    conditionOptions={conditionOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    user={user}
                    type={'REQUEST'}
                    isLoading={getBorrowRequests.isLoading}
                    getTableData={getBorrowRequests}
                />
            </div>
        </>
    );
}

export default BorrowRequests;