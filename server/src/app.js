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
const {
  getEmployees,
  getEmployeeById,
  getEmployeeCount,
  getAllEmployees,
  getEmployeesByCafeId,
} = require("./config/service/employee");
const {
  getCafeCount,
  getCafes,
  getCafeById,
  getAllCafes,
} = require("./config/service/cafe");

dotenv.config();
app.use(cors());
app.use(express.json());

router.get("/employees", async (req, res) => {
  try {
    // TODO: Validate the Cafe Id format
    let { cafe } = req.query;
    const employees = await getAllEmployees();
    
    let formattedEmployees = await Promise.all(
      employees.map(async (employee) => {
        const cafeDetails = await prisma.cafe.findFirst({
          where: {
            id: employee.cafe_id,
          },
        });
        return {
          id: employee.id,
          name: employee.name,
          email_address: employee.email_address,
          gender: employee.gender,
          phone_number: employee.phone_number,
          created_at: employee.created_at,
          cafe_id: employee.cafe_id,
          cafe_name: cafeDetails.name,
          days_worked: calculateDaysWorked(employee.created_at),
        };
      })
    );

    defineConsoleLogs(formattedEmployees);
    defineConsoleLogs(formattedEmployees.length);
    // Filter out the list if there is a matching cafe id
    if (cafe) {
      formattedEmployees = formattedEmployees.filter(
        (employee) => employee.cafe_id === cafe
      );
    }
    defineConsoleLogs(formattedEmployees);
    defineConsoleLogs(formattedEmployees.length);

    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully received all employees",
      data: {
        employees: formattedEmployees,
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
    // TODO: Validate text format
    let { location } = req.query;
    const cafes = await prisma.cafe.findMany({
      where: {
        location: {
          contains: location,
        },
      },
    });

    return res.status(HTTP_STATUS.OK).send({
      success: true,
      message: "Successfully received all cafes",
      data: {
        cafes,
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
  "/cafe/create",
  validateRequestBody(createCafeSchema),
  async (req, res) => {
    try {
      const requestBody = req.body;
      await prisma.cafe.create({
        data: {
          name: requestBody["name"],
          description: requestBody["description"],
          location: requestBody["location"],
          logo: requestBody["logo"] ?? null,
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
  "/employee/create",
  validateRequestBody(createEmployeeSchema),
  async (req, res) => {
    try {
      const requestBody = req.body;
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
    // console.log(id);
    const requestBody = req.body;
    const employeeDetails = await getEmployeeById(id);
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
router.get("/cafe/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const requestBody = req.body;
    const cafeDetails = await getCafeById(id);
    const cafeEmployees = await getEmployeesByCafeId(id);
    cafeDetails.employees = cafeEmployees;
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
});

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
      const requestBody = req.body;
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
      const requestBody = req.body;
      await prisma.cafe.update({
        where: {
          id,
        },
        data: {
          name: requestBody["name"],
          description: requestBody["description"],
          location: requestBody["location"],
          logo: requestBody["logo"] ?? null,
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
    // console.log(id);
    const requestBody = req.body;
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
    // console.log(id);
    const requestBody = req.body;
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
