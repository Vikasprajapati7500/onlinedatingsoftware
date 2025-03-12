-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "weeklyBudget" TEXT NOT NULL,
    "monthlyBudget" TEXT NOT NULL,
    "flexibleBudget" TEXT NOT NULL,
    "limitedBudget" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);
