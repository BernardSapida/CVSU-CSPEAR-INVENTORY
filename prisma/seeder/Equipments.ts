import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';

const prisma = new PrismaClient();

const generateBoolean = () => Math.floor(Math.random() * 2) == 0;

const equipments: Equipment[] = [
    { "id": new ObjectId().toString(), "name": "Basketball", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Volleyball", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Shuttlecock", "stock": 40, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Badminton Racket", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Arnis Stick", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Soccer Ball", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Tennis Ball", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Tennis Racket", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Cricket Bat", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Cricket Ball", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Baseball Bat", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Baseball", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Softball", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Frisbee", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Jump Rope", "stock": 40, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Hula Hoop", "stock": 35, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Yoga Mat", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Dumbbells", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Kettlebell", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Resistance Bands", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Agility Ladder", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Cones", "stock": 50, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Whistle", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Stopwatch", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Ping Pong Ball", "stock": 40, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Ping Pong Paddle", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Pool Noodles", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Tug of War Rope", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Balance Board", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Jumping Stilts", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Scooter Board", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Hockey Stick", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Lacrosse Stick", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Skipping Ropes", "stock": 30, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Medicine Ball", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Sledgehammer", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Boxing Gloves", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Punching Bag", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Gymnastic Rings", "stock": 15, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Climbing Rope", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Knee Pads", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Elbow Pads", "stock": 25, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Headgear", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Table Tennis Table", "stock": 5, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Dodgeball", "stock": 20, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Cornhole Set", "stock": 10, "is_available": generateBoolean() },
    { "id": new ObjectId().toString(), "name": "Kayak", "stock": 5, "is_available": generateBoolean() }
];

export const populateEquipments = async () => {
    await prisma.equipments.deleteMany();

    for (let equipment of equipments) {
        const createdEquipment = await prisma.equipments.create({
            data: {
                id: new ObjectId().toString(),
                name: equipment.name,
                stock: equipment.stock,
                isAvailable: equipment.is_available,
            },
        });

        console.log(createdEquipment);
    }
}
