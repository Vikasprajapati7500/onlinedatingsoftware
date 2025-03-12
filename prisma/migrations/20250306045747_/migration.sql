/*
  Warnings:

  - You are about to drop the column `bodyMeasurement` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DietPlan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HealthAssessment` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Healthinfo" DROP COLUMN "bodyMeasurement";

-- DropTable
DROP TABLE "Budget";

-- DropTable
DROP TABLE "DietPlan";

-- DropTable
DROP TABLE "HealthAssessment";
