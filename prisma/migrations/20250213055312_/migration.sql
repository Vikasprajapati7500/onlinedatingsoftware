-- CreateTable
CREATE TABLE "Technicaldetails" (
    "id" SERIAL NOT NULL,
    "measurementSystem" TEXT NOT NULL,
    "foodPortions" TEXT NOT NULL,
    "cookingFacilities" TEXT NOT NULL,
    "kitchenAppliances" TEXT NOT NULL,
    "cookingSkills" TEXT NOT NULL,

    CONSTRAINT "Technicaldetails_pkey" PRIMARY KEY ("id")
);
