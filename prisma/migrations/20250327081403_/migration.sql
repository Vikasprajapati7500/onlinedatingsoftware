/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Userinfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Userinfo_email_key" ON "Userinfo"("email");
