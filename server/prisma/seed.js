const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const prisma = new PrismaClient();
const SAMPLE_NUMBER = 50;

// Create a fake employee list
// Reference: https://blog.alexrusin.com/prisma-seeding-quickly-populate-your-database-for-development/
function createEmployeeList(cafes) {
  const employees = [];
  for (let i = 0; i < SAMPLE_NUMBER; i++) {
    const cafeId = faker.number.int({ min: 1, max: 9 });
    const cafeDetails = cafes[cafeId];
    const created_at = faker.date.between({
      from: "2024-01-01",
      to: Date.now(),
    });

    employees.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email_address: faker.internet.email(),
      gender: faker.number.binary() == 1 ? "MALE" : "FEMALE",
      created_at,
      phone_number: faker.phone.number({ style: "international" }),
      cafe_id: cafeDetails.id,
    });
  }
  return employees;
}

function createCafeList() {
  const cafes = [];
  for (let i = 0; i < SAMPLE_NUMBER; i++) {
    cafes.push({
      id: faker.string.uuid(),
      name: faker.company.name(),
      description: faker.lorem.sentence(),
      location: faker.location.city(),
      logo: faker.image.url(),
    });
  }
  return cafes;
}

async function main() {
  const cafes = createCafeList();

  await prisma.cafe.createMany({
    data: cafes,
  });

  await prisma.employee.createMany({
    data: createEmployeeList(cafes),
  });
}

async function init() {
  const employees = await prisma.employee.count();

  if (employees === 0) {
    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
    console.log("Database is successully seeded");
  } else {
    console.log("Database seeding is not needed");
  }
}

init();
