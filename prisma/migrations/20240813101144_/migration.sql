/*
  Warnings:

  - You are about to drop the column `Parentscategories` on the `categories` table. All the data in the column will be lost.
  - Added the required column `parentscategories` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" DROP COLUMN "Parentscategories",
ADD COLUMN     "parentscategories" TEXT NOT NULL;
