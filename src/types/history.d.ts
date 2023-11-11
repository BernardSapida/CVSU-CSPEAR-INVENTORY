interface NotificationHistory {
    id: string,
    request_id: string,
    title: string,
    borrow_status: BorrowStatus,
    condition: Condition,
    is_viewed: boolean,
    created_at: Date
}