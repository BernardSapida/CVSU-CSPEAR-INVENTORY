import Card from '@/components/admin/notification/Card';

function Notification() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Notifications</h1>
            <hr />
            <div className="space-y-3 py-3">
                <Card title='Borrow Request #13' status='Pending' time='1 hours ago' />
                <Card title='Borrow Request #12' status='To pickup' time='3 hours ago' />
                <Card title='Borrow Request #11' status='Picked up' time='4 hours ago' />
                <Card title='Borrow Request #10' status='Returned' time='5 hours ago' />
                <Card title='Borrow Request #9' status='Returned' time='6 hours ago' />
                <Card title='Borrow Request #8' status='Returned' time='7 hours ago' />
                <Card title='Borrow Request #7' status='Returned' time='8 hours ago' />
                <Card title='Borrow Request #6' status='Returned' time='9 hours ago' />
                <Card title='Borrow Request #5' status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #4' status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #3' status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #2' status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #1' status='Returned' time='2 hours ago' />
            </div>
        </>
    );
}

export default Notification;