import { db } from "@/lib/db/index";

export const viewUserNotification = async (notificationId: string) => {
    await db.userNotifications.update({
        where: {
            id: notificationId
        },
        data: {
            isViewed: true
        }
    });
}

export const viewAdminNotification = async (borrowRequestId: string) => {
    await db.adminNotifications.update({
        where: {
            borrowRequestId: borrowRequestId
        },
        data: {
            isViewed: true
        }
    });
}