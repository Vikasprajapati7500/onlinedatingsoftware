/*
  Warnings:

  - You are about to drop the column `dietaryRestriction` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `sleepPattern` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `stressMentalHealth` on the `Healthinfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Healthinfo" DROP COLUMN "dietaryRestriction",
DROP COLUMN "sleepPattern",
DROP COLUMN "stressMentalHealth";
