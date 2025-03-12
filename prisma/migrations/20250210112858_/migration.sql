/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- CreateTable
CREATE TABLE "Healthform" (
    "id" SERIAL NOT NULL,
    "selectedCondition" TEXT NOT NULL,
    "otherCondition" TEXT NOT NULL,

    CONSTRAINT "Healthform_pkey" PRIMARY KEY ("id")
);
