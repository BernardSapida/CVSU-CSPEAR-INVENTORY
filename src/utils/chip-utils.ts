import { AvailabilityStatus, CardStatus, ConditionStatus } from '../model/ChipModel';

export const getAvailabilityColor = (is_available: boolean) => {
    if (is_available) {
        return AvailabilityStatus.AVAILABLE;
    } else {
        return AvailabilityStatus.NOT_AVAILABLE;
    }
}

export const getConditionColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'good':
            return ConditionStatus.GOOD;
        case 'damaged':
            return ConditionStatus.DAMAGED;
        case 'misplaced':
            return ConditionStatus.MISPLACED;
    }
}

export const getRequestStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return CardStatus.PENDING;
        case 'topickup':
            return CardStatus.TOPICKUP;
        case 'pickedup':
            return CardStatus.PICKEDUP;
        case 'returned':
            return CardStatus.RETURNED;
    }
}

export const getNotificationMessage = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return "We have received the borrow request.";
        case 'topickup':
            return "You can now pick up the equipments.";
        case 'pickedup':
            return "You have picked up the equipment.";
        case 'returned':
            return "You have returned the equipment.";
    }
}