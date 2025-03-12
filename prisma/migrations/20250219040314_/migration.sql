/*
  Warnings:

  - Added the required column `userId` to the `Lifestyle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lifestyle" ADD COLUMN     "userId" TEXT NOT NULL;
