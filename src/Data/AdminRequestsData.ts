const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "NAME", uid: "name", sortable: true },
    { name: "EMAIL", uid: "email", sortable: true },
    { name: "COLLEGE", uid: "college", sortable: true },
    { name: "ROLE", uid: "role", sortable: true },
    { name: "BORROW STATUS", uid: "borrow_status", sortable: true },
    { name: "CONDITION", uid: "condition", sortable: true },
    { name: "BORROW DATE", uid: "borrow_date", sortable: true },
    { name: "RETURN DATE", uid: "return_date", sortable: true },
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

const requestsList = [
    {
        id: 1,
        name: "Bernard Sapida",
        email: "bernard.sapida@cvsu.edu.ph",
        role: "faculty",
        borrow_status: "pending",
        condition: "good",
        borrow_date: "2023-11-21",
        return_date: "2023-11-30",
    },
    {
        id: 2,
        name: "Kylie Sapida",
        email: "kylie.sapida@cvsu.edu.ph",
        role: "student",
        borrow_status: "to pickup",
        condition: "good",
        borrow_date: "2023-11-21",
        return_date: "2023-11-30",
    },
    {
        id: 3,
        name: "Julianne Sapida",
        email: "jullianne.sapida@cvsu.edu.ph",
        role: "student",
        borrow_status: "picked up",
        condition: "misplaced",
        borrow_date: "2023-11-21",
        return_date: "2023-11-30",
    },
    {
        id: 4,
        name: "Mark Sapida",
        email: "jullianne.sapida@cvsu.edu.ph",
        role: "student",
        borrow_status: "returned",
        condition: "damaged",
        borrow_date: "2023-11-21",
        return_date: "2023-11-30",
    },
];

export {
    columns,
    requestsList,
    borrowStatusOptions,
    conditionOptions
};