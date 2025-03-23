const express = require("express");
const app = express();
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const HTTP_STATUS = require("./constants/httpStatus");
const prisma = require("./config/database");
const {
  defineConsoleLogs,
  verifyPageAndLimit,
  calculateDaysWorked,
} = require("./config/service/common");
const {
  createEmployeeSchema,
  validateRequestBody,
  updateEmployeeSchema,
  updateCafeSchema,
  createCafeSchema,
} = require("./config/service/validation");

dotenv.config();
app.use(cors());
app.use(express.json());

router.get("/employees", async (req, res) => {
  try {
    let { page, limit } = req.query;
    // console.log("router.stack: ", router.stack);
    const {
      page: currentPage,
      limit: currentLimit,
      success,
      message = "",
      data = null,
    } = verifyPageAndLimit(page, limit);
    if (!success) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
        success: false,
        message,
        data,
      });
    }
    page = currentPage;
    limit = currentLimit;

    const employees = await prisma.employee.findMany({
      skip: Number(page - 1) * Number(limit),
      take: Number(limit),
    });

    const formattedEmployees = employees.map((employee) => {
      return {
        id: employee.id,
        name: employee.name,
        email_address: employee.email_address,
        gender: employee.gender,
        phone_number: employee.phone_number,
        created_at: employee.created_at,
        cafe_id: employee.cafe_id,
        days_worked: calculateDaysWorked(employee.created_at),
      };
    });
    defineConsoleLogs(formattedEmployees);

    const total = await prisma.employee.count();
    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully received all employees",
      data: {
        employees: formattedEmployees,
        total: total,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Internal server error",
    });
  }
});

router.get("/cafes", async (req, res) => {
  try {
    let { page, limit } = req.query;
    console.log("router.stack: ", router.stack);
    const {
      page: currentPage,
      limit: currentLimit,
      success,
      message = "",
      data = null,
    } = verifyPageAndLimit(page, limit);
    if (!success) {
      return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send({
        success: false,
        message,
        data,
      });
    }
    page = currentPage;
    limit = currentLimit;

    const cafes = await prisma.cafe.findMany({
      skip: Number(page - 1) * Number(limit),
      take: Number(limit),
    });
    console.log("cafes");
    console.log(cafes);

    const total = await prisma.cafe.count();
    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully received all cafes",
      data: {
        cafes,
        total,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Internal server error",
    });
  }
});

/**
 * POST /cafe
 * Create a new cafe
 */
router.post(
  "/cafe",
  validateRequestBody(createCafeSchema),
  async (req, res) => {
    try {
      const requestBody = req.body;
      console.log(requestBody);

      await prisma.cafe.create({
        data: {
          name: requestBody["name"],
          description: requestBody["description"],
          location: requestBody["location"],
          logo: requestBody["logo"],
        },
      });

      return res.status(HTTP_STATUS.OK).send({
        success: true,
        message: "Successfully inserted cafe details.",
        data: {},
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * POST /employee
 * Create a new employee
 */
router.post(
  "/employee",
  validateRequestBody(createEmployeeSchema),
  async (req, res) => {
    try {
      const requestBody = req.body;
      console.log(requestBody);

      await prisma.employee.create({
        data: {
          name: requestBody["name"],
          email_address: requestBody["email_address"],
          gender: requestBody["gender"],
          phone_number: requestBody["phone_number"],
          created_at: new Date(requestBody["start_date"]),
          cafe_id: requestBody["cafe_id"],
        },
      });

      return res.status(HTTP_STATUS.OK).send({
        success: true,
        message: "Successfully updated cafe details.",
        data: {},
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * GET /employee/:id
 * Get an existing employee
 */
router.get("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const requestBody = req.body;
    console.log(requestBody["name"]);

    const employeeDetails = await prisma.employee.findFirst({
      where: {
        id,
      },
    });

    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully retrieved employee details.",
      data: employeeDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Internal server error",
    });
  }
});

/*
 * Get /cafe/:id
 * Get an existing cafe
 */
router.get(
  "/cafe/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const requestBody = req.body;
      console.log(requestBody["name"]);

      const cafeDetails = await prisma.cafe.findFirst({
        where: {
          id,
        }
      });

      return res.status(HTTP_STATUS.OK).send({
        success: true,
        message: "Successfully retrieved cafe details.",
        data: cafeDetails,
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * PUT /employee/:id
 * Update an existing employee
 */
router.put(
  "/employee/:id",
  validateRequestBody(updateEmployeeSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const requestBody = req.body;
      console.log(requestBody["name"]);

      await prisma.employee.update({
        where: {
          id,
        },
        data: {
          name: requestBody["name"],
          email_address: requestBody["email_address"],
          gender: requestBody["gender"],
          phone_number: requestBody["phone_number"],
          cafe_id: requestBody["cafe_id"],
        },
      });

      return res.status(HTTP_STATUS.OK).send({
        success: true,
        message: "Successfully updated employee details.",
        data: {},
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/*
 * PUT /cafe/:id
 * Update an existing cafe
 */
router.put(
  "/cafe/:id",
  validateRequestBody(updateCafeSchema),
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(req.body);
      const requestBody = req.body;
      console.log(requestBody["name"]);

      await prisma.cafe.update({
        where: {
          id,
        },
        data: {
          name: requestBody["name"],
          description: requestBody["description"],
          location: requestBody["location"],
          logo: requestBody["logo"],
        },
      });

      return res.status(HTTP_STATUS.OK).send({
        success: true,
        message: "Successfully updated cafe details.",
        data: {},
      });
    } catch (error) {
      console.error(error);
      return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
);

/**
 * DELETE /cafe/:id
 * Delete an existing cafe
 */
router.delete("/cafe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const requestBody = req.body;
    console.log(requestBody);

    const employees = await prisma.employee.findMany({
      where: {
        cafe_id: id,
      },
    });

    if (employees.length > 0) {
      await prisma.employee.deleteMany({
        where: {
          cafe_id: id,
        },
      });
    }
    // TODO: Check if exists before trigger
    await prisma.cafe.delete({
      where: {
        id,
      },
    });

    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully deleted cafe details.",
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Internal server error",
    });
  }
});

router.delete("/employee/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const requestBody = req.body;
    console.log(requestBody);

    await prisma.employee.delete({
      where: {
        id: id,
      },
    });

    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully deleted employee details.",
      data: {},
    });
  } catch (error) {
    console.error(error);
    return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send({
      success: false,
      message: "Internal server error",
    });
  }
});

app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Listening to port: ${process.env.PORT}`);
});
