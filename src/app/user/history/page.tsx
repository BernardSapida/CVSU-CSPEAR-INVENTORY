import Card from '@/components/users/history/Card';

function BorrowRequest() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">History</h1>
            <hr />
            <div className="space-y-3 py-3">
                <Card title='Borrow Request #13' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #12' status='Returned' time='2 months ago' />
                <Card title='Borrow Request #11' status='Returned' time='3 months ago' />
                <Card title='Borrow Request #10' status='Returned' time='4 months ago' />
                <Card title='Borrow Request #9' status='Returned' time='4 months ago' />
                <Card title='Borrow Request #8' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #7' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #6' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #5' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #4' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #3' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #2' status='Returned' time='1 week ago' />
                <Card title='Borrow Request #1' status='Returned' time='1 week ago' />
            </div>
        </>
    );
}

export default BorrowRequest;