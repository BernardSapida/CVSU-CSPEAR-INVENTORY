'use client'

import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
} from "@nextui-org/react";
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { LiaTimesCircle } from 'react-icons/lia';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import AddModal from './AddModal';

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

const INITIAL_VISIBLE_COLUMNS = ["id", "equipment", "stock", "status", "actions"];

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

const EquipmentTable: FunctionComponent<EquipmentTableProps> = ({ columns, equipments, statusOptions }) => {
    const [filterValue, setFilterValue] = useState("");
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [statusFilter, setStatusFilter] = useState<any>("all");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [activeEquipment, setActiveEquipment] = useState<Record<string, any>>({});
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });
    const [equipmentsList, setEquipmentsList] = useState<{
        id: number;
        equipment: string;
        quantity: number;
        stock: number;
        status: string;
    }[]>(equipments);
    const [page, setPage] = useState(1);
    const addDisclosure = useDisclosure();
    const editDisclosure = useDisclosure();
    const deleteDisclosure = useDisclosure();

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns.toString() === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredItems = [...equipmentsList];

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
    }, [equipmentsList, filterValue, statusFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

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
            case "actions":
                return (
                    <div className="flex gap-1">
                        <Button
                            isIconOnly
                            startContent={<AiOutlineEdit />}
                            size='sm'
                            className='bg-default-900 text-white'
                            onClick={() => {
                                setActiveEquipment(equipment)
                                editDisclosure.onOpen()
                            }}
                        />
                        <Button
                            isIconOnly
                            startContent={<FaRegTrashAlt />}
                            size='sm'
                            color="danger"
                            onClick={() => {
                                setActiveEquipment(equipment)
                                deleteDisclosure.onOpen()
                            }}
                        />
                    </div>
                );
            case "stock":
                return `${cellValue}pcs`
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
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
                        placeholder="Search by equipment name..."
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
                            <DropdownTrigger className="hidden sm:flex">
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
                        <Button
                            color='primary'
                            onPress={addDisclosure.onOpen}
                        >
                            Add equipment
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {equipmentsList.length} equipments</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div >
        );
    }, [
        filterValue,
        statusFilter,
        visibleColumns,
        onRowsPerPageChange,
        equipmentsList.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <div className="hidden sm:flex w-[30%] justify-start gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
            </div>
        );
    }, [items.length, page, pages, hasSearchFilter]);

    return (
        <>
            <Table
                isHeaderSticky
                bottomContent={bottomContent}
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
                <TableBody emptyContent={"No equipments found"} items={sortedItems}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <AddModal
                isOpen={addDisclosure.isOpen}
                onOpen={addDisclosure.onOpen}
                onOpenChange={addDisclosure.onOpenChange}
                setEquipmentsList={setEquipmentsList}
            />
            <EditModal
                isOpen={editDisclosure.isOpen}
                onOpen={editDisclosure.onOpen}
                onOpenChange={editDisclosure.onOpenChange}
                equipment={activeEquipment}
                setEquipmentsList={setEquipmentsList}
            />
            <DeleteModal
                isOpen={deleteDisclosure.isOpen}
                onOpen={deleteDisclosure.onOpen}
                onOpenChange={deleteDisclosure.onOpenChange}
                equipment={activeEquipment}
                setEquipmentsList={setEquipmentsList}
            />
        </>
    );
}

export default EquipmentTable;