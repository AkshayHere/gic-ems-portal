const { z } = require("zod");

// Reference:
// https://github.com/colinhacks/zod
// https://zod.dev/
const createEmployeeSchema = z.object({
  name: z.string().min(6).max(10),
  email_address: z.string().email("Not a valid email"),
  gender: z.enum(["MALE", "FEMALE"]),
  phone_number: z.string(),
  start_date: z.coerce.date().min(new Date()),
  cafe_id: z.string(),
});

const updateEmployeeSchema = z.object({
  name: z.string().min(6).max(10),
  email_address: z.string().email("Not a valid email"),
  gender: z.enum(["MALE", "FEMALE"]),
  phone_number: z.string(),
  cafe_id: z.string(),
});

const createCafeSchema = z.object({
  name: z.string().min(6).max(50),
  description: z.string().min(10).max(255),
  location: z.string().min(10).max(100),
  logo: z.string().min(10).max(100).optional(),
});

const updateCafeSchema = z.object({
  name: z.string().min(6).max(50),
  description: z.string().min(10).max(255),
  location: z.string().min(10).max(100),
});

const validateRequestBody = (schema) => {
  return (req, res, next) => {
    try {
      console.info(req.body);
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.map((issue) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        console.error(errorMessages);
        return res.status(422).json({
          message: "Validation failed",
          errors: errorMessages,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};

module.exports = {
  createEmployeeSchema,
  updateEmployeeSchema,
  createCafeSchema,
  updateCafeSchema,
  validateRequestBody,
};
