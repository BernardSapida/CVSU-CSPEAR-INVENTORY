type RecordType = Equipment[] | BorrowEquipment[] | any;

interface CustomizableTableProps {
    columns: ({
        name: string;
        uid: string;
        sortable?: boolean;
    })[],
    records?: RecordType,
    borrowStatusOptions?: {
        name: string;
        uid: string;
    }[],
    availabilityStatusOptions?: {
        name: string;
        uid: string;
    }[],
    conditionOptions?: {
        name: string;
        uid: string;
    }[],
    INITIAL_VISIBLE_COLUMNS: string[],
    user?: User,
    type: TableType,
    isLoading: boolean,
    getTableData: any
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

type BorrowEquipment = {
    id: string,
    name: string;
    quantity: number;
    stock: number;
    is_available: boolean;
}

interface UserBorrowItems {
    id: string,
    equipments: BorrowEquipment[],
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
    equipments: BorrowEquipment[],
    purpose: string,
    borrow_date: Date,
    return_date: Date,
    user_id: string,
    borrow_status: BorrowStatus,
    condition: Condition,
    note: string,
    created_at: Date
}