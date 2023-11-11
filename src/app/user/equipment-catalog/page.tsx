import CustomTable from '@/components/CustomTable';
import { columns, equipments, statusOptions } from "../../../Data/CatalogData";

function EquipmentCatalog() {
    const INITIAL_VISIBLE_COLUMNS = ["id", "equipment", "stock", "status", "actions"];

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Equipment Catalog</h1>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    records={equipments}
                    statusOptions={statusOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    role={'USER'}
                    type={'CATALOG'}
                />
            </div>
        </>
    );
}

export default EquipmentCatalog;