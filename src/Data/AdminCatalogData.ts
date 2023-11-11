const columns = [
    { name: "ID", uid: "id", sortable: true },
    { name: "EQUIPMENT", uid: "equipment", sortable: true },
    { name: "STOCK", uid: "stock", sortable: true },
    { name: "STATUS", uid: "status", sortable: true },
    { name: "ACTIONS", uid: "actions" },
];

const statusOptions = [
    { name: "Available", uid: "available" },
    { name: "Unavailable", uid: "unavailable" },
];

const equipments = [
    {
        id: 1,
        equipment: "Basketball",
        status: "available",
        stock: 5,
    },
    {
        id: 2,
        equipment: "Soccer ball",
        status: "available",
        stock: 10,
    },
    {
        id: 3,
        equipment: "Volleyball",
        status: "available",
        stock: 15,
    }
];

export { columns, equipments, statusOptions };