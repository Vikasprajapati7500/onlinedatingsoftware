/*
  Warnings:

  - Added the required column `digitalUsage` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recreational` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stressLevel` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lifestyle" ADD COLUMN     "customDigital" TEXT,
ADD COLUMN     "customRecreational" TEXT,
ADD COLUMN     "customStress" TEXT,
ADD COLUMN     "digitalUsage" TEXT NOT NULL,
ADD COLUMN     "recreational" TEXT NOT NULL,
ADD COLUMN     "stressLevel" TEXT NOT NULL;
