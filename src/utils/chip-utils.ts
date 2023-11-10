import { AvailabilityStatus, CardStatus, ConditionStatus } from '../model/ChipMode';

export const getColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'available':
            return AvailabilityStatus.available;
        case 'unavailable':
            return AvailabilityStatus.unavailable;
        case 'pending':
            return CardStatus.pending;
        case 'to pickup':
            return CardStatus.to_pickup;
        case 'picked up':
            return CardStatus.picked_up;
        case 'returned':
            return CardStatus.returned;
        case 'good':
            return ConditionStatus.good;
        case 'damaged':
            return ConditionStatus.damaged;
        case 'misplaced':
            return ConditionStatus.misplaced;
    }
}

export const getMessage = (status: string) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return "We have received the borrow request.";
        case 'to pickup':
            return "You can now pick up the equipments.";
        case 'picked up':
            return "You have picked up the equipment.";
        case 'returned':
            return "You have returned the equipment.";
    }
}