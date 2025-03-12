/*
  Warnings:

  - Added the required column `averageSleep` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyRoutine` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lifestyle" ADD COLUMN     "averageSleep" TEXT NOT NULL,
ADD COLUMN     "customRoutine" TEXT,
ADD COLUMN     "customSleep" TEXT,
ADD COLUMN     "dailyRoutine" TEXT NOT NULL;
