/*
  Warnings:

  - Added the required column `state` to the `Demographics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demographics" ADD COLUMN     "state" TEXT NOT NULL;
