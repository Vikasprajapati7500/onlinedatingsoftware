-- CreateTable
CREATE TABLE "Otp" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);
