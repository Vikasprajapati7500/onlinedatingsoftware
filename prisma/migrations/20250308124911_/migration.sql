/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Demographics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Demographics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Demographics" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Demographics_userId_key" ON "Demographics"("userId");
