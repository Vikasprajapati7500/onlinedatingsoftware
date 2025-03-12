/*
  Warnings:

  - You are about to drop the `Healthform` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Healthform";

-- CreateTable
CREATE TABLE "HealthInfo" (
    "id" SERIAL NOT NULL,
    "selectedCondition" TEXT NOT NULL,
    "otherCondition" TEXT,
    "selectedMedication" TEXT NOT NULL,
    "otherMedication" TEXT,
    "selectedAllergy" TEXT NOT NULL,
    "otherAllergy" TEXT,
    "selectedMeasurement" TEXT NOT NULL,
    "otherMeasurement" TEXT,
    "selectedDietaryRestriction" TEXT NOT NULL,
    "otherDietaryRestriction" TEXT,
    "selectedDietaryPreference" TEXT NOT NULL,
    "otherDietaryPreference" TEXT,
    "selectedPhysicalActivity" TEXT NOT NULL,
    "selectedSleepPattern" TEXT NOT NULL,
    "selectedFamilyMedicalHistory" TEXT NOT NULL,
    "otherFamilyMedicalHistory" TEXT,
    "selectedStressMentalHealth" TEXT NOT NULL,
    "otherStressMentalHealth" TEXT,
    "selectedSupplement" TEXT NOT NULL,
    "otherSupplement" TEXT,
    "selectedSubstance" TEXT NOT NULL,
    "otherSubstance" TEXT,
    "selectedSurgery" TEXT NOT NULL,
    "otherSurgery" TEXT,
    "selectedDeficiency" TEXT NOT NULL,
    "otherDeficiency" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HealthInfo_pkey" PRIMARY KEY ("id")
);
