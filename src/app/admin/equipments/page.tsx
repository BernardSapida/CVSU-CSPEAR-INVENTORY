import EquipmentTable from '@/components/users/equipment-catalog/EquipmentTable';

function EquipmentCatalog() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Equipment Catalog</h1>
            <hr />
            <div className='mt-5'>
                <EquipmentTable />
            </div>
        </>
    );
}

export default EquipmentCatalog;