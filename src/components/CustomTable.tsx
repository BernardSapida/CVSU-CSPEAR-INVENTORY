'use client'

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Skeleton,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure
} from "@nextui-org/react";
import { FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { toast } from 'sonner';
import TableActions from './TableActions';
import AddModal from './modal/AddModal';
import DeleteModal from './modal/DeleteModal';
import EditModal from './modal/EditModal';
import moment from 'moment';
import AvailabilityChip from './AvailabilityChip';
import RequestStatusChip from './RequestStatusChip';
import ConditionChip from './ConditionChip';
import { trpc } from '@/lib/trpc/client';
import { UserContext } from '@/store/UserContext';

const CustomTable: FunctionComponent<CustomizableTableProps> = ({
    columns,
    records,
    availabilityStatusOptions,
    borrowStatusOptions,
    conditionOptions,
    INITIAL_VISIBLE_COLUMNS,
    type,
    isLoading,
    getTableData
}) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState<RecordType>([]);
    const [visibleColumns, setVisibleColumns] = useState<any>(new Set(INITIAL_VISIBLE_COLUMNS));
    const [filterValue, setFilterValue] = useState("");
    const [borrowStatusFilter, setBorrowStatusFilter] = useState<any>("all");
    const [conditionStatusFilter, setConditionStatusFilter] = useState<any>("all");
    const [availabilityStatusFilter, setAvailabilityStatusFilter] = useState<any>("all");
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sortDescriptor, setSortDescriptor] = useState<any>({
        column: "age",
        direction: "ascending",
    });
    const [activeEquipment, setActiveEquipment] = useState<Record<string, any>>({});
    const addDisclosure = useDisclosure();
    const editDisclosure = useDisclosure();
    const deleteDisclosure = useDisclosure();
    const addBorrowItem = trpc.borrowItems.addBorrowItem.useMutation();
    const removeBorrowItem = trpc.borrowItems.removeBorrowItem.useMutation();
    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        if (records && !isLoading) {
            setData(records);
        }
    }, [isLoading]);

    const headerColumns = useMemo(() => {
        if (visibleColumns.toString() === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredItems = [...data];

        if (hasSearchFilter) {
            filteredItems = filteredItems.filter((obj) =>
                obj?.name?.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }

        if (availabilityStatusFilter !== "all" && Array.from(availabilityStatusFilter).length !== availabilityStatusOptions?.length) {
            filteredItems = filteredItems.filter((record) =>
                Array.from(availabilityStatusFilter).includes(record.is_available ? 'available' : 'not available')
            );
        }

        if (borrowStatusFilter !== "all" && Array.from(borrowStatusFilter).length !== borrowStatusOptions?.length) {
            filteredItems = filteredItems.filter((record) =>
                Array.from(borrowStatusFilter).includes(record.borrow_status.toLowerCase())
            );
        }

        if (conditionStatusFilter !== "all" && Array.from(conditionStatusFilter).length !== conditionOptions?.length) {
            filteredItems = filteredItems.filter((record) =>
                Array.from(conditionStatusFilter).includes(record.condition.toLowerCase())
            );
        }

        return filteredItems;
    }, [data, filterValue, availabilityStatusFilter, borrowStatusFilter, conditionStatusFilter]);

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

    const addToBorrow: (eq: any) => void = (eq: any) => {
        if (!user) return;

        const newEquipment: BorrowEquipment = { ...eq, quantity: 1 };
        addBorrowItem.mutate({ ...newEquipment, user_id: user.id });
        toast.success('Equipment has been added');
    }

    const removeEquipment: (eq: any) => void = (eq: any) => {
        if (!user) return;

        removeBorrowItem.mutate({ id: eq.id, user_id: user.id });
        setData((prevState: any) => {
            const newList = [...prevState.filter((e: any) => e.id != eq.id)];
            return newList;
        })
        toast.success('Equipment has been removed');
    }

    const CB = (() => {
        if (user?.role === 'Student' || user?.role === 'Faculty') {
            switch (type) {
                case 'CATALOG':
                    return addToBorrow
                case 'REQUEST':
                    return removeEquipment
            }
        }

        if (user?.role === 'Admin') {
            switch (type) {
                case 'CATALOG':
                    return updateDeleteEquipment;
                case 'REQUEST':
                    return removeEquipment // ! Ha?
            }
        }
    })()!;

    const renderCell = useCallback((equipment: any, columnKey: any) => {
        const cellValue = equipment[columnKey];

        switch (columnKey) {
            case "is_available":
                return (
                    <AvailabilityChip is_available={cellValue} />
                );
            case "borrow_status":
                return (
                    <RequestStatusChip status={cellValue} />
                );
            case "condition":
                return (
                    <ConditionChip status={cellValue} />
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
                return <TableActions role={user?.role} type={type} CB={CB} equipment={equipment} />;
            case "stock":
                return `${cellValue}pcs`
            case "borrow_date":
                return moment(cellValue).format('MMM D, YYYY')
            case "return_date":
                return moment(cellValue).format('MMM D, YYYY')
            default:
                return cellValue;
        }
    }, [user]);

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
            <div className="flex justify-center flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Skeleton
                        className='rounded-lg w-full sm:max-w-[44%]'
                        isLoaded={!isLoading}
                        children={
                            <Input
                                isClearable
                                size='sm'
                                placeholder="Search by name..."
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
                        }
                    />
                    <div className="flex items-center gap-3">
                        {
                            user?.role == "Admin" &&
                            type == "CATALOG" &&
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Button
                                        aria-label='Add new equipment'
                                        color='primary'
                                        onClick={addDisclosure.onOpen}
                                    >
                                        Add equipment
                                    </Button>
                                }
                            />
                        }
                        {
                            availabilityStatusOptions &&
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Dropdown>
                                        <DropdownTrigger className="hidden sm:flex">
                                            <Button
                                                endContent={
                                                    <AiOutlineDown />
                                                }
                                                variant="flat"
                                                aria-label='Status dropdown'
                                            >
                                                Availability Status
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Table Columns"
                                            closeOnSelect={false}
                                            selectionMode="multiple"
                                            onSelectionChange={setAvailabilityStatusFilter}
                                        >
                                            {availabilityStatusOptions.map((status: any) => (
                                                <DropdownItem key={status.uid} className="capitalize">
                                                    {status.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            />
                        }
                        {
                            borrowStatusOptions &&
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Dropdown>
                                        <DropdownTrigger className="hidden sm:flex">
                                            <Button
                                                endContent={
                                                    <AiOutlineDown />
                                                }
                                                variant="flat"
                                                aria-label='Status dropdown'
                                            >
                                                Borrow Status
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Table Columns"
                                            closeOnSelect={false}
                                            selectionMode="multiple"
                                            onSelectionChange={setBorrowStatusFilter}
                                        >
                                            {borrowStatusOptions.map((status: any) => (
                                                <DropdownItem key={status.uid} className="capitalize">
                                                    {status.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            />

                        }
                        {
                            conditionOptions &&
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Dropdown>
                                        <DropdownTrigger className="hidden sm:flex">
                                            <Button
                                                endContent={
                                                    <AiOutlineDown />
                                                }
                                                variant="flat"
                                                aria-label='Status dropdown'
                                            >
                                                Condition
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            disallowEmptySelection
                                            aria-label="Table Columns"
                                            closeOnSelect={false}
                                            selectionMode="multiple"
                                            onSelectionChange={setConditionStatusFilter}
                                        >
                                            {conditionOptions.map((condition: any) => (
                                                <DropdownItem key={condition.uid} className="capitalize">
                                                    {condition.name}
                                                </DropdownItem>
                                            ))}
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            />

                        }
                        <Skeleton
                            className='rounded-lg'
                            isLoaded={!isLoading}
                            children={
                                <Dropdown>
                                    <DropdownTrigger className="hidden sm:flex">
                                        <Button
                                            endContent={
                                                <AiOutlineDown />
                                            }
                                            variant="flat"
                                            aria-label='Column dropdown'
                                        >
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
                            }
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton
                        className='rounded-lg'
                        isLoaded={!isLoading}
                        children={
                            <span className="text-default-400 text-small">Total {data.length} records</span>
                        }
                    />
                    <Skeleton
                        className='rounded-lg'
                        isLoaded={!isLoading}
                        children={
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
                        }
                    />
                </div>
            </div >
        );
    }, [
        filterValue,
        availabilityStatusFilter,
        visibleColumns,
        onRowsPerPageChange,
        data.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <>
                {
                    <div className="py-2 px-2 flex justify-between items-center">
                        <div className="hidden sm:flex w-[30%] justify-start gap-2">
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                                        Previous
                                    </Button>
                                }
                            />
                            <Skeleton
                                className='rounded-lg'
                                isLoaded={!isLoading}
                                children={
                                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                                        Next
                                    </Button>
                                }
                            />
                        </div>
                        <Skeleton
                            className='rounded-lg'
                            isLoaded={!isLoading}
                            children={
                                !isLoading && <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={setPage}
                                    aria-disabled
                                />
                            }
                        />
                    </div>
                }
            </>
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
                <TableBody
                    emptyContent={isLoading ? ' ' : "No record found"}
                    items={sortedItems}
                    isLoading={isLoading}
                    loadingContent={<div className='text-center'><Spinner size='sm' color='current' /><p className='text-tiny'>Loading...</p></div>}
                >
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
                setData={setData}
                getTableData={getTableData}
            />
            <EditModal
                isOpen={editDisclosure.isOpen}
                onOpenChange={editDisclosure.onOpenChange}
                equipment={activeEquipment}
                setData={setData}
                getTableData={getTableData}
            />
            <DeleteModal
                isOpen={deleteDisclosure.isOpen}
                onOpenChange={deleteDisclosure.onOpenChange}
                equipment={activeEquipment}
                setData={setData}
                getTableData={getTableData}
            />
        </>
    );
}

export default CustomTable;