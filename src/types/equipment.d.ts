interface CustomizableTableProps {
    columns: ({
        name: string;
        uid: string;
        sortable?: boolean;
    })[],
    records: Records[],
    statusOptions: {
        name: string;
        uid: string;
    }[],
    INITIAL_VISIBLE_COLUMNS: string[],
    role: UserRole,
    type: TableType
}

type Records = {
    id?: number;
    equipment?: string;
    status?: string;
    quantity?: number;
    stock?: number;

    name?: string;
    email?: string;
    role?: string;
    borrow_status?: string;
    condition?: string;
    borrow_date?: string;
    return_date?: string;
}

type Equipment = {
    id: string;
    name: string;
    stock: number;
    is_available: boolean;
}

interface QuantityAndID {
    id: string;
    quantity: number;
}

interface UserBorrowRequest {
    id: string,
    equipments: QuantityAndID[],
    purpose: string,
    borrow_date: Date,
    return_date: Date,
    user_id: string,
}

interface AdminBorrowRequest {
    id: string,
    name: string,
    email: string,
    college: College
    role: Role,
    equipments: QuantityAndID[],
    purpose: string,
    borrow_date: Date,
    return_date: Date,
    user_id: string,
    borrow_status: BorrowStatus,
    condition: Condition,
    note: string,
    created_at: Date
}