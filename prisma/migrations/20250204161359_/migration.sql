/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LeaveRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orderitem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "ActivityLevel" AS ENUM ('sedentary', 'moderate', 'active');

-- CreateEnum
CREATE TYPE "HealthGoal" AS ENUM ('weight_loss', 'weight_gain', 'maintain_weight');

-- CreateEnum
CREATE TYPE "WorkingHours" AS ENUM ('1', '2', '3');

-- CreateEnum
CREATE TYPE "WorkType" AS ENUM ('sedentary', 'active');

-- CreateEnum
CREATE TYPE "MealPreference" AS ENUM ('vegetarian', 'vegan', 'non_vegetarian');

-- CreateEnum
CREATE TYPE "DietaryRestrictions" AS ENUM ('allergies', 'intolerances', 'religious_restrictions');

-- DropTable
DROP TABLE "Attendance";

-- DropTable
DROP TABLE "LeaveRequest";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "Orderitem";

-- DropTable
DROP TABLE "Task";

-- CreateTable
CREATE TABLE "HealthAssessment" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "activityLevel" "ActivityLevel" NOT NULL,
    "healthGoal" "HealthGoal" NOT NULL,
    "workingHours" "WorkingHours" NOT NULL,
    "workType" "WorkType" NOT NULL,
    "mealPreference" "MealPreference" NOT NULL,
    "dietaryRestrictions" "DietaryRestrictions" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthAssessment_pkey" PRIMARY KEY ("id")
);
