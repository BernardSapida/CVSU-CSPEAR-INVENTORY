const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email", sortable: true },
    { name: "COLLEGE", uid: "college", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "BORROW STATUS", uid: "borrowStatus", sortable: true },
    { name: "CONDITION", uid: "condition", sortable: true },
    { name: "BORROW DATE", uid: "borrowDate", sortable: true },
    { name: "RETURN DATE", uid: "returnDate", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const borrowStatusOptions = [
    { name: "Pending", uid: "pending" },
    { name: "To pickup", uid: "to pickup" },
    { name: "Picked up", uid: "picked up" },
    { name: "Returned", uid: "returned" },
];

const conditionOptions = [
    { name: "Good", uid: "good" },
    { name: "Damaged", uid: "damaged" },
    { name: "Misplaced", uid: "misplaced" },
];

export {
    columns,
    borrowStatusOptions,
    conditionOptions
};