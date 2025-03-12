-- CreateTable
CREATE TABLE "Eatinghabits" (
    "id" SERIAL NOT NULL,
    "eatingHabits" TEXT NOT NULL,
    "mealPreference" TEXT NOT NULL,
    "diningPreference" TEXT NOT NULL,

    CONSTRAINT "Eatinghabits_pkey" PRIMARY KEY ("id")
);
