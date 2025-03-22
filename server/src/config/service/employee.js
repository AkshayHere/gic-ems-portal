const prisma = require("../database");

const getEmployees = async (page, limit) => {
  await prisma.employee.findMany({
    skip: Number(page - 1) * Number(limit),
    take: Number(limit),
  });
};

const getEmployeeCount = async () => {
  await prisma.employee.count();
};

const getEmployeeById = async (employeeId) => {
  await prisma.employee.findUnique({
    where: {
      id: employeeId,
    },
  });
};

module.exports = { getEmployees, getEmployeeCount, getEmployeeById };
