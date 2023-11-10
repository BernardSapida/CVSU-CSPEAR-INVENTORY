'use client'

import { statusColorMap } from '@/utils/table-utils';
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
import { AiOutlineCheckCircle, AiOutlineDown } from 'react-icons/ai';
import { LiaTimesCircle } from 'react-icons/lia';
import { toast } from 'sonner';
import TableActions from './TableActions';
import AddModal from './modal/AddModal';
import DeleteModal from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import IconChip from './IconChip';

const CustomTable: FunctionComponent<CustomizableTableProps> = ({
    columns,
    equipments,
    statusOptions,
    INITIAL_VISIBLE_COLUMNS,
    role,
    type
}) => {
    const [equipmentList, setEquipmentList] = useState<Record<string, any>[]>(equipments);
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState<any>("all");
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });
    const [activeEquipment, setActiveEquipment] = useState<Record<string, any>>({});
    const addDisclosure = useDisclosure();
    const editDisclosure = useDisclosure();
    const deleteDisclosure = useDisclosure();

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns.toString() === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredItems = [...equipmentList];

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
    }, [equipmentList, filterValue, statusFilter]);

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

    const updateDeleteEquipment: (eq?: any, action?: any) => void = (eq: any, action: any) => {
        setActiveEquipment(eq);

        if (action == "update") {
            editDisclosure.onOpen();
        }

        if (action == "delete") {
            deleteDisclosure.onOpen();
        }
    }

    const addToBorrow: () => void = () => {
        toast.success('Equipment has been added')
    }

    const removeEquipment: (eq?: any) => void = (eq: any) => {
        setEquipmentList(prevState => {
            const newList = [...prevState.filter((e) => e.id != eq.id)];
            return newList;
        })
        toast.success('Equipment has been removed')
    }

    const CB = (() => {
        if (role === 'USER') {
            switch (type) {
                case 'CATALOG':
                    return addToBorrow
                case 'REQUEST':
                    return removeEquipment
            }
        }

        if (role === 'ADMIN') {
            switch (type) {
                case 'CATALOG':
                    return updateDeleteEquipment;
                case 'REQUEST':
                    return removeEquipment
            }
        }
    })()!;

    const renderCell = useCallback((equipment: any, columnKey: any) => {
        const cellValue = equipment[columnKey];

        switch (columnKey) {
            case "status":
                return (
                    <IconChip status={cellValue} />
                );
            case "borrow_status":
                return (
                    <IconChip status={cellValue} />
                );
            case "condition":
                return (
                    <IconChip status={cellValue} />
                );
            case "quantity":
                return (
                    type == 'VIEW-REQUEST' ?
                        cellValue :
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
                );
            case "actions":
                return <TableActions role={role} type={type} CB={CB} equipment={equipment} />;
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
                                    <AiOutlineDown />
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
                                {statusOptions.map((status: any) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        <span className='capitalize'>{status.name}</span>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={
                                    <AiOutlineDown />
                                } variant="flat">
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
                                {columns.map((column: any) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        <span className='capitalize'>{column.name}</span>
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {equipments.length} equipments</span>
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
        equipmentList.length,
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
                    {(column: any) => (
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
                onOpenChange={addDisclosure.onOpenChange}
                setEquipmentList={setEquipmentList}
            />
            <EditModal
                isOpen={editDisclosure.isOpen}
                onOpenChange={editDisclosure.onOpenChange}
                equipment={activeEquipment}
                setEquipmentList={setEquipmentList}
            />
            <DeleteModal
                isOpen={deleteDisclosure.isOpen}
                onOpenChange={deleteDisclosure.onOpenChange}
                equipment={activeEquipment}
                setEquipmentList={setEquipmentList}
            />
        </>
    );
}

export default CustomTable;