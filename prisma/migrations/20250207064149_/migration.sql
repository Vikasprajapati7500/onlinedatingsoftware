/*
  Warnings:

  - Added the required column `plan` to the `DietPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DietPlan" ADD COLUMN     "plan" TEXT NOT NULL;
