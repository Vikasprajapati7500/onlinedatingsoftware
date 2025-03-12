-- CreateTable
CREATE TABLE "Demographics" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "heightFt" INTEGER NOT NULL,
    "heightIn" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Demographics_pkey" PRIMARY KEY ("id")
);
