/*
  Warnings:

  - Added the required column `password` to the `Userinfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Userinfo" ADD COLUMN     "password" TEXT NOT NULL;
