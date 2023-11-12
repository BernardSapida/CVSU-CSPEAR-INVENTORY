interface UserNotification {
    id: string,
    request_id: string,
    title: string,
    borrow_status: BorrowStatus,
    is_viewed: boolean,
    user_id: string,
    created_at: Date
}

interface adminNotification {
    id: string,
    request_id: string,
    title: string,
    description: string,
    is_viewed: boolean,
    user_id: string,
    created_at: Date
}