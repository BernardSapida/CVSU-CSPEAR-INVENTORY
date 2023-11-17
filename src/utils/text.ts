export const capitalize = (word: string) => {
    return word.toLowerCase().replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

export const formatStatus = (word: string) => {
    return word.replace(/\s+/g, '');
}

export const getFormattedBorrowStatus = (status: string) => {
    const statusOptions: Record<string, string> = {
        Pending: 'Pending',
        ToPickup: 'To Pickup',
        PickedUp: 'Picked Up',
        Returned: 'Returned'
    }

    return statusOptions[status];
}