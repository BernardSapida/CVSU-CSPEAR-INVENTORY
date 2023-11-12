const columns = [
    { name: "NAME", uid: "name", sortable: true },
    { name: "QUANTITY", uid: "quantity", sortable: true },
];

const availabilityStatusOptions = [
    { name: "Available", uid: "available" },
    { name: "Not Available", uid: "not available" },
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

export { columns, equipments, availabilityStatusOptions };