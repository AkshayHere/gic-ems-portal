/*
  Warnings:

  - You are about to drop the `cafe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "cafe";

-- DropTable
DROP TABLE "employee";

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email_address" VARCHAR(100) NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone_number" VARCHAR(100) NOT NULL,
    "cafe_id" UUID,
    "created_at" TIMESTAMP(3),
    "days_worked" INTEGER,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cafes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "location" VARCHAR(100) NOT NULL,
    "logo" VARCHAR(100) NOT NULL,

    CONSTRAINT "cafes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_cafeId_key" ON "employees"("cafe_id");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_cafeId_fkey" FOREIGN KEY ("cafe_id") REFERENCES "cafes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DropIndex
DROP INDEX "employees_cafeId_key";

-- RenameForeignKey
ALTER TABLE "employees" RENAME CONSTRAINT "employees_cafeId_fkey" TO "employees_cafe_id_fkey";
