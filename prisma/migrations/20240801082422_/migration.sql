/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "BlogTitle" TEXT NOT NULL,
    "BlogDescription" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);
