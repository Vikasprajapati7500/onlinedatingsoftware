/*
  Warnings:

  - You are about to drop the column `customActivity` on the `Lifestyle` table. All the data in the column will be lost.
  - You are about to drop the column `customDigital` on the `Lifestyle` table. All the data in the column will be lost.
  - You are about to drop the column `customRecreational` on the `Lifestyle` table. All the data in the column will be lost.
  - You are about to drop the column `customRoutine` on the `Lifestyle` table. All the data in the column will be lost.
  - You are about to drop the column `customSleep` on the `Lifestyle` table. All the data in the column will be lost.
  - You are about to drop the column `customStress` on the `Lifestyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lifestyle" DROP COLUMN "customActivity",
DROP COLUMN "customDigital",
DROP COLUMN "customRecreational",
DROP COLUMN "customRoutine",
DROP COLUMN "customSleep",
DROP COLUMN "customStress";
