
-- CreateTable
CREATE TABLE "employee" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email_address" VARCHAR(100) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone_number" VARCHAR(100) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafe" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(100) NOT NULL,

    CONSTRAINT "cafe_pkey" PRIMARY KEY ("id")
);
