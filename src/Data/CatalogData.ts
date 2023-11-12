const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "STOCK", uid: "stock", sortable: true },
    { name: "AVAILABILITY", uid: "is_available", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Available", uid: "available" },
    { name: "Not Available", uid: "not available" },
];

const equipments = [
    {
        id: 1,
        equipment: "Basketball",
        is_available: "available",
        stock: 5,
    },
    {
        id: 2,
        equipment: "Soccer ball",
        is_available: "available",
        stock: 10,
    },
    {
        id: 3,
        equipment: "Volleyball",
        is_available: "available",
        stock: 15,
    }
];

export { columns, equipments, statusOptions };