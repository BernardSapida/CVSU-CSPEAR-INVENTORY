import EquipmentTable from '@/components/admin/equipment-catalog/EquipmentTable';
import { columns, equipments, statusOptions } from "../../../Data/Data";

function EquipmentCatalog() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Equipment Catalog</h1>
            <hr />
            <div className='mt-5'>
                <EquipmentTable
                    columns={columns}
                    equipments={equipments}
                    statusOptions={statusOptions}
                />
            </div>
        </>
    );
}

export default EquipmentCatalog;