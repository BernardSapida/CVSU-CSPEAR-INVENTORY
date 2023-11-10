export enum CardStatus {
    pending = 'warning',
    to_pickup = 'secondary',
    picked_up = 'primary',
    returned = 'success'
}

export enum ConditionStatus {
    good = 'success',
    misplaced = 'warning',
    damaged = 'danger',
}