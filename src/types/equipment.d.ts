interface CustomizableTableProps {
    columns: ({
        name: string;
        uid: string;
        sortable?: boolean;
    })[],
    equipments: {
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
    }[],
    statusOptions: {
        name: string;
        uid: string;
    }[],
    INITIAL_VISIBLE_COLUMNS: string[],
    role: UserRole,
    type: TableType
}