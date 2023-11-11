import Card from '@/components/users/history/Card';

function BorrowRequest() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">History</h1>
            <hr />
            <div className="space-y-3 py-3">
                <Card title='Borrow Request #13' borrow_status='Returned' equipment_condition='Damaged' time='1 week ago' />
                <Card title='Borrow Request #12' borrow_status='Returned' equipment_condition='Misplaced' time='2 months ago' />
                <Card title='Borrow Request #11' borrow_status='Returned' equipment_condition='Damaged' time='3 months ago' />
                <Card title='Borrow Request #10' borrow_status='Returned' equipment_condition='Good' time='4 months ago' />
                <Card title='Borrow Request #9' borrow_status='Returned' equipment_condition='Damaged' time='4 months ago' />
                <Card title='Borrow Request #8' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
                <Card title='Borrow Request #7' borrow_status='Returned' equipment_condition='Misplaced' time='1 week ago' />
                <Card title='Borrow Request #6' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
                <Card title='Borrow Request #5' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
                <Card title='Borrow Request #4' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
                <Card title='Borrow Request #3' borrow_status='Returned' equipment_condition='Misplaced' time='1 week ago' />
                <Card title='Borrow Request #2' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
                <Card title='Borrow Request #1' borrow_status='Returned' equipment_condition='Good' time='1 week ago' />
            </div>
        </>
    );
}

export default BorrowRequest;