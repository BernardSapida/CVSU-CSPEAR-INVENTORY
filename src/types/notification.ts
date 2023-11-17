interface UserNotification {
    id: string,
    borrowStatus: BorrowStatus,
    isViewed: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    borrowRequestId: string,
}

interface AdminNotification {
    id: string,
    isViewed: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    borrowRequestId: string,
}