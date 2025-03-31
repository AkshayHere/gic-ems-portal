const prisma = require("../database");

const getCafes = async (page, limit) => {
  return new Promise((resolve, reject) => {
    prisma.cafe
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

const getAllCafes = async () => {
  return new Promise((resolve, reject) => {
    prisma.cafe
      .findMany()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getCafeCount = async () => {
  return new Promise((resolve, reject) => {
    prisma.cafe
      .count()
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getCafeById = async (cafeId) => {
  return new Promise((resolve, reject) => {
    prisma.cafe
      .findUnique({
        where: {
          id: cafeId,
        },
      })
      .then((result) => {
        resolve(result);
      });
  });
};

module.exports = { getCafeById, getCafeCount, getCafes, getAllCafes };
