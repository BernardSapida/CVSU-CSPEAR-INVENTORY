import { columns, equipments, statusOptions } from "../../../Data/CatalogData";
import CustomTable from '@/components/CustomTable';

function EquipmentCatalog() {
    const INITIAL_VISIBLE_COLUMNS = ["id", "equipment", "stock", "status", "actions"];

    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Equipment Catalog</h1>
            <hr />
            <div className='mt-5'>
                <CustomTable
                    columns={columns}
                    equipments={equipments}
                    statusOptions={statusOptions}
                    INITIAL_VISIBLE_COLUMNS={INITIAL_VISIBLE_COLUMNS}
                    role={'ADMIN'}
                    type={'CATALOG'}
                />
            </div>
        </>
    );
}

export default EquipmentCatalog;