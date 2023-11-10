'use client'

import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineDelete } from 'react-icons/ai';
import { LiaTimesCircle } from 'react-icons/lia';
import { toast } from 'sonner';

const ChevronDownIcon = <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    className="text-small"
>
    <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
    />
</svg>;

const statusColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined> = {
    available: "success",
    unavailable: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["equipment", "quantity", "stock", "status", "actions"];

interface EquipmentTableProps {
    columns: ({
        name: string;
        uid: string;
        sortable: boolean;
    } | {
        name: string;
        uid: string;
        sortable?: undefined;
    })[],
    equipments: {
        id: number;
        equipment: string;
        status: string;
        quantity: number;
        stock: number;
    }[],
    statusOptions: {
        name: string;
        uid: string;
    }[]
}

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const EquipmentTable: FunctionComponent<EquipmentTableProps> = ({
    columns,
    equipments,
    statusOptions
}) => {
    const [borrowEquipment, setBorrowEquipment] = useState<{
        id: number;
        equipment: string;
        quantity: number;
        stock: number;
        status: string;
    }[]>(equipments);
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<any>("all");
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });
    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns.toString() === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredItems = [...borrowEquipment];

        if (hasSearchFilter) {
            filteredItems = filteredItems.filter((equipment) =>
                equipment.equipment.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredItems = filteredItems.filter((equipment) =>
                Array.from(statusFilter).includes(equipment.status),
            );
        }

        return filteredItems;
    }, [borrowEquipment, filterValue, statusFilter]);

    const items = useMemo(() => filteredItems, [page, filteredItems]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a: Record<string, any>, b: Record<string, any>) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = useCallback((equipment: any, columnKey: any) => {
        const cellValue = equipment[columnKey];

        switch (columnKey) {
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[equipment.status]}
                        size="sm"
                        variant="flat"
                        startContent={equipment.status == 'available' ? <AiOutlineCheckCircle /> : <LiaTimesCircle />}
                    >
                        {cellValue}
                    </Chip>
                );
            case "quantity":
                return (
                    <div>
                        <Input
                            aria-label={equipment.id}
                            name={equipment.id}
                            type='number'
                            min="1"
                            max={equipment.stock.toString()}
                            variant='bordered'
                            size='sm'
                            defaultValue={cellValue}
                        />
                    </div>
                );
            case "actions":
                return (
                    <Button
                        startContent={<AiOutlineDelete />}
                        size='sm'
                        color="danger"
                        isIconOnly
                        onClick={() => {
                            setBorrowEquipment(prevState => {
                                return prevState.filter((e) => {
                                    return e.id != equipment.id
                                });
                            })
                            toast.success('Equipment has been removed')
                        }}
                    />
                );
            case "stock":
                return `${cellValue}pcs`
            default:
                return cellValue;
        }
    }, []);

    const onSearchChange = useCallback((value: any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        size='sm'
                        placeholder="Search by equipment..."
                        startContent={
                            <svg
                                aria-hidden="true"
                                fill="none"
                                focusable="false"
                                height="1em"
                                role="presentation"
                                viewBox="0 0 24 24"
                                width="1em"
                            >
                                <path
                                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M22 22L20 20"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                        }
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger
                                className="hidden sm:flex">
                                <Button endContent={
                                    ChevronDownIcon
                                } variant="flat">
                                    Status
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={ChevronDownIcon} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div >
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        borrowEquipment.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    return (
        <Table
            aria-label="Equipment Table"
            isHeaderSticky
            bottomContentPlacement="outside"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No borrow equipment found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}

export default EquipmentTable;