-- CreateTable
CREATE TABLE "Nutritionaldeficiency" (
    "id" SERIAL NOT NULL,
    "weightManagement" TEXT NOT NULL,
    "nutrientTargets" TEXT NOT NULL,
    "healthGoals" TEXT NOT NULL,

    CONSTRAINT "Nutritionaldeficiency_pkey" PRIMARY KEY ("id")
);
