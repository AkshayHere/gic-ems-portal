/*
  Warnings:

  - You are about to drop the column `days_worked` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "days_worked";

-- DropTable
DROP TABLE "user";
