'use client';

import { trpc } from '@/lib/trpc/client';
import { columns, statusOptions } from "../../../Data/AdminCatalogData";
import CustomTable from '@/components/CustomTable';

function EquipmentCatalog() {
    const INITIAL_VISIBLE_COLUMNS = ["name", "stock", "is_available", "actions"];
    const getEquipments = trpc.equipments.getEquipments.useQuery();

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Equipment Catalog</h1>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    records={getEquipments.data}
                    statusOptions={statusOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    role={'Admin'}
                    type={'CATALOG'}
                    isLoading={getEquipments.isLoading}
                    getTableData={getEquipments}
                />
            </div>
        </>
    );
}

export default EquipmentCatalog;