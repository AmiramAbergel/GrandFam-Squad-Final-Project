//Family Members Collection:
F = {
    _id: ObjectId('5f9a0a8a9f54c958f4d7ef1a'),
    firstName: 'John',
    lastName: 'Smith',
    age: 19,
    address: 'null',
    phone: '',
    img: '',
    mail: '',
    maternalRank: { visit: 3, call: 2, total: 8 },
    paternalRank: { visit: 1, call: 2, total: 10 },
    maternalGrandparent: ObjectId('5f9a0b8a9f54c958f4d7ef1b'),
    paternalGrandparent: ObjectId('5f9a0c8a9f54c958f4d7ef1c'),
};
//Grandparents Collection:
G = {
    _id: ObjectId('5f9a0b8a9f54c958f4d7ef1b'),
    side: 'maternal',
    grandma: { name: 'Alice', age: 87 },
    spouse: { name: 'Tony', age: 87, relationship: 'grandpa' },
    lastName: 'Smith',
    relationship: 'grandma',
    sharedWith: ['Jane', 'Bob'],
    address: 'null',
    phone: '',
    img: '',
    location: {
        type: 'Point',
        coordinates: [-73.856077, 40.848447],
    },
    tasks: [
        {
            description: 'Pick up groceries',
            assignedTo: 'John',
            dueDate: '2022-12-24',
        },
        {
            description: 'Take out the trash',
            assignedTo: 'Jane',
            dueDate: '2022-12-25',
        },
        {
            description: 'Fix leaking faucet',
            assignedTo: 'Bob',
            dueDate: '2022-12-26',
        },
        {
            description: 'Mow the lawn',
            assignedTo: 'John',
            dueDate: '2022-12-24',
        },
        {
            description: 'Wash the car',
            assignedTo: 'Jane',
            dueDate: '2022-12-25',
        },
        {
            description: 'Change light bulbs',
            assignedTo: 'Bob',
            dueDate: '2022-12-26',
        },
    ],
    appointments: [
        {
            owner: 'grandma',
            type: 'doctor',
            date: '2022-12-20',
            time: '14:00',
            location: '123 Main St',
        },
        {
            owner: 'grandpa',
            type: 'haircut',
            date: '2022-12-22',
            time: '10:00',
            location: '456 Main St',
        },
        {
            owner: 'grandpa',
            type: 'dentist',
            date: '2022-12-20',
            time: '14:00',
            location: '123 Main St',
        },
        {
            owner: 'grandma',
            type: 'massage',
            date: '2022-12-22',
            time: '10:00',
            location: '456 Main St',
        },
    ],
    events: [
        {
            type: 'birthday party',
            date: '2022-12-23',
            time: '16:00',
            location: '789 Main St',
        },
        {
            type: 'book club',
            date: '2022-12-27',
            time: '19:00',
            location: '321 Main St',
        },
        {
            type: 'holiday party',
            date: '2022-12-23',
            time: '16:00',
            location: '789 Main St',
        },
        {
            type: 'yoga class',
            date: '2022-12-27',
            time: '19:00',
            location: '321 Main St',
        },
    ],
    visits: [
        {
            date: '2022-01-01',
            type: 'phone call',
            familyMember: ObjectId('5f9a0a8a9f54c958f4d7ef1a'),
        },
        {
            date: '2022 -02-01',
            type: 'in-person',
            familyMember: ObjectId('5f9a0a8a9f54c958f4d7ef1a'),
        },
        {
            date: '2022-03-01',
            type: 'in-person',
            familyMember: ObjectId('5f9a0a8a9f54c958f4d7ef1a'),
        },
        {
            date: '2022-03-05',
            type: 'in-person',
            familyMember: ObjectId('5f9a0d8a9f54c958f4d7ef1d'),
        },
        {
            date: '2022-03-10',
            type: 'in-person',
            familyMember: ObjectId('5f9a0e8a9f54c958f4d7ef1e'),
        },
    ],
};
//User Accounts Collection:
U = {
    _id: ObjectId('5f9a0f8a9f54c958f4d7ef1f'),
    username: 'johnsmith',
    password: '$2b$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa',
    familyMember: ObjectId('5f9a0a8a9f54c958f4d7ef1a'),
};
