interface UserNotification {
    id: string,
    request_id: string,
    title: string,
    borrow_status: BorrowStatus,
    is_viewed: boolean,
    created_at: Date
}

interface adminNotification {
    id: string,
    request_id: string,
    title: string,
    borrow_status: BorrowStatus,
    is_viewed: boolean,
    created_at: Date
}