/*
  Warnings:

  - You are about to drop the column `measurementSystem` on the `Technicaldetails` table. All the data in the column will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Technicaldetails" DROP COLUMN "measurementSystem";

-- DropTable
DROP TABLE "Otp";

-- DropTable
DROP TABLE "User";
