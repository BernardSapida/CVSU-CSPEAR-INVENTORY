import Card from '@/components/users/notification/Card';

function Notification() {
    return (
        <>
            <h1 className="text-3xl font-semibold my-6">Notifications</h1>
            <hr />
            <div className="space-y-3 py-3">
                <Card title='Borrow Request #13' borrow_status='Pending' time='1 hours ago' />
                <Card title='Borrow Request #12' borrow_status='Returned' time='3 hours ago' />
                <Card title='Borrow Request #12' borrow_status='Picked up' time='4 hours ago' />
                <Card title='Borrow Request #12' borrow_status='To pickup' time='5 hours ago' />
                <Card title='Borrow Request #12' borrow_status='Pending' time='6 hours ago' />
                <Card title='Borrow Request #8' borrow_status='Returned' time='7 hours ago' />
                <Card title='Borrow Request #7' borrow_status='Returned' time='8 hours ago' />
                <Card title='Borrow Request #6' borrow_status='Returned' time='9 hours ago' />
                <Card title='Borrow Request #5' borrow_status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #4' borrow_status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #3' borrow_status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #2' borrow_status='Returned' time='2 hours ago' />
                <Card title='Borrow Request #1' borrow_status='Returned' time='2 hours ago' />
            </div>
        </>
    );
}

export default Notification;