/*
  Warnings:

  - You are about to drop the column `otheractivitylevel` on the `Lifestyle` table. All the data in the column will be lost.
  - Added the required column `customActivity` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lifestyle" DROP COLUMN "otheractivitylevel",
ADD COLUMN     "customActivity" TEXT NOT NULL;
