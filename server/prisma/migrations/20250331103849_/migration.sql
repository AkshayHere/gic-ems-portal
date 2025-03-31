/*
  Warnings:

  - A unique constraint covering the columns `[employee_id]` on the table `employees` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employee_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employee_id" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_id_key" ON "employees"("employee_id");
