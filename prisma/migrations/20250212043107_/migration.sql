/*
  Warnings:

  - You are about to drop the `HealthInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "HealthInfo";

-- CreateTable
CREATE TABLE "Healthinfo" (
    "id" SERIAL NOT NULL,
    "selectedCondition" TEXT NOT NULL,
    "selectedMedication" TEXT NOT NULL,
    "selectedAllergy" TEXT NOT NULL,
    "selectedMeasurement" TEXT NOT NULL,
    "selectedDietaryRestriction" TEXT NOT NULL,
    "selectedDietaryPreference" TEXT NOT NULL,
    "selectedPhysicalActivity" TEXT NOT NULL,
    "selectedSleepPattern" TEXT NOT NULL,
    "selectedFamilyMedicalHistory" TEXT NOT NULL,
    "selectedStressMentalHealth" TEXT NOT NULL,
    "selectedSupplement" TEXT NOT NULL,
    "selectedSubstance" TEXT NOT NULL,
    "selectedSurgery" TEXT NOT NULL,
    "selectedDeficiency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Healthinfo_pkey" PRIMARY KEY ("id")
);
