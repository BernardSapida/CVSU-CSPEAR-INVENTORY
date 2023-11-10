import { Button, Input } from '@nextui-org/react';
import { HiOutlineDocumentReport } from 'react-icons/hi';

function Notification() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Reports</h1>
            <hr />
            <div className='my-5'>
                <p className='text-xl'>Generate a report with information based on the selected month.</p>
                <p>• Supply Equipments - It maintains a record of supply equipment.</p>
                <p>• Return  Equipments - It contains records about returned equipment.</p>
                <p>• Inventory Write-Off - It records information about damaged or misplaced equipment.</p>
                <form action="" className='my-5'>
                    <Input
                        name='month'
                        labelPlacement='inside'
                        label="Month Report"
                        defaultValue='2023-11-21'
                        placeholder='#'
                        type='month'
                        className='mb-2'
                    />
                    <div className='flex justify-end'>
                        <Button
                            startContent={<HiOutlineDocumentReport />}
                            color='primary'
                            type='submit'
                            size='sm'
                        >Generate Report</Button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Notification;