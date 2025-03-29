const prisma = require("../database");

// Reference: https://stackoverflow.com/questions/55041467/how-to-await-a-promise
const getEmployees = async (page, limit) => {
  return new Promise((resolve, reject) => {
    prisma.employee
      .findMany({
        skip: Number(page - 1) * Number(limit),
        take: Number(limit),
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getAllEmployees = async () => {
  return new Promise((resolve, reject) => {
    prisma.employee
      .findMany()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getEmployeeCount = async () => {
  return new Promise((resolve, reject) => {
    prisma.employee
      .count()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getEmployeeById = async (employeeId) => {
  return new Promise((resolve, reject) => {
    prisma.employee
      .findUnique({
        where: {
          id: employeeId,
        },
      })
      .then((result) => {
        resolve(result);
      });
  });
};

module.exports = {
  getEmployees,
  getEmployeeCount,
  getEmployeeById,
  getAllEmployees,
};
