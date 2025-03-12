/*
  Warnings:

  - Added the required column `productname` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productprice` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "productname" TEXT NOT NULL,
ADD COLUMN     "productprice" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
