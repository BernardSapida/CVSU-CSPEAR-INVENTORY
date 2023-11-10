const columns = [
    // { name: "ID", uid: "id", sortable: true },
    { name: "EQUIPMENT", uid: "equipment", sortable: true },
    { name: "QUANTITY", uid: "quantity", sortable: true },
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
        quantity: 5,
        stock: 5,
    },
    {
        id: 2,
        equipment: "Soccer ball",
        status: "available",
        quantity: 10,
        stock: 10,
    },
    {
        id: 3,
        equipment: "Volleyball",
        status: "available",
        quantity: 15,
        stock: 15,
    }
];

export { columns, equipments, statusOptions };