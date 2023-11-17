type RecordType = Equipment[] | CartItems[] | BorrowRequests[] | any;

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
    borrowDate?: string;
    returnDate?: string;
}

type Equipment = {
    id: string;
    name: string;
    stock: number;
    isAvailable: boolean;
}

type CartItem = {
    id: string,
    name: string;
    quantity: number;
    stock: number;
    isAvailable: boolean;
    cartId?: string;
    cart?: Cart;
}

interface Cart {
    id?: string,
    cartItems: CartItem[],
    isSubmitted: boolean;
    userId: string,
}