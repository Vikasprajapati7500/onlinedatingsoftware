/*
  Warnings:

  - You are about to drop the column `selectedAllergy` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedCondition` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedDeficiency` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedDietaryPreference` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedDietaryRestriction` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedFamilyMedicalHistory` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedMeasurement` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedMedication` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedPhysicalActivity` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedSleepPattern` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedStressMentalHealth` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedSubstance` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedSupplement` on the `Healthinfo` table. All the data in the column will be lost.
  - You are about to drop the column `selectedSurgery` on the `Healthinfo` table. All the data in the column will be lost.
  - Added the required column `allergy` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyMeasurement` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaryPreference` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dietaryRestriction` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familyMedicalHistory` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `healthCondition` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medication` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionalDeficiency` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physicalActivity` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sleepPattern` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stressMentalHealth` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `substance` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplement` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surgery` to the `Healthinfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Healthinfo" DROP COLUMN "selectedAllergy",
DROP COLUMN "selectedCondition",
DROP COLUMN "selectedDeficiency",
DROP COLUMN "selectedDietaryPreference",
DROP COLUMN "selectedDietaryRestriction",
DROP COLUMN "selectedFamilyMedicalHistory",
DROP COLUMN "selectedMeasurement",
DROP COLUMN "selectedMedication",
DROP COLUMN "selectedPhysicalActivity",
DROP COLUMN "selectedSleepPattern",
DROP COLUMN "selectedStressMentalHealth",
DROP COLUMN "selectedSubstance",
DROP COLUMN "selectedSupplement",
DROP COLUMN "selectedSurgery",
ADD COLUMN     "allergy" TEXT NOT NULL,
ADD COLUMN     "bodyMeasurement" TEXT NOT NULL,
ADD COLUMN     "dietaryPreference" TEXT NOT NULL,
ADD COLUMN     "dietaryRestriction" TEXT NOT NULL,
ADD COLUMN     "familyMedicalHistory" TEXT NOT NULL,
ADD COLUMN     "healthCondition" TEXT NOT NULL,
ADD COLUMN     "medication" TEXT NOT NULL,
ADD COLUMN     "nutritionalDeficiency" TEXT NOT NULL,
ADD COLUMN     "physicalActivity" TEXT NOT NULL,
ADD COLUMN     "sleepPattern" TEXT NOT NULL,
ADD COLUMN     "stressMentalHealth" TEXT NOT NULL,
ADD COLUMN     "substance" TEXT NOT NULL,
ADD COLUMN     "supplement" TEXT NOT NULL,
ADD COLUMN     "surgery" TEXT NOT NULL;
