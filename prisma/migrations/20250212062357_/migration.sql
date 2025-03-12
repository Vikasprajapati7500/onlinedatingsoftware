-- CreateTable
CREATE TABLE "DietaryPreference" (
    "id" SERIAL NOT NULL,
    "dietaryLifestyle" TEXT NOT NULL,
    "dietaryFramework" TEXT NOT NULL,
    "preferredFoods" TEXT NOT NULL,
    "dislikedFoods" TEXT NOT NULL,
    "culturalRestrictions" TEXT NOT NULL,

    CONSTRAINT "DietaryPreference_pkey" PRIMARY KEY ("id")
);
