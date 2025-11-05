/*
  Warnings:

  - You are about to drop the column `sets` on the `WorkoutLogExercise` table. All the data in the column will be lost.
  - Added the required column `reps` to the `WorkoutLogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setNumber` to the `WorkoutLogExercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `WorkoutLogExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutLogExercise" DROP COLUMN "sets",
ADD COLUMN     "reps" INTEGER NOT NULL,
ADD COLUMN     "setNumber" INTEGER NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;
