/*
  Warnings:

  - A unique constraint covering the columns `[sourceLogId]` on the table `PersonalBest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."PersonalBest" ADD COLUMN     "sourceLogId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PersonalBest_sourceLogId_key" ON "public"."PersonalBest"("sourceLogId");

-- AddForeignKey
ALTER TABLE "public"."PersonalBest" ADD CONSTRAINT "PersonalBest_sourceLogId_fkey" FOREIGN KEY ("sourceLogId") REFERENCES "public"."ExerciseLog"("id") ON DELETE SET NULL ON UPDATE CASCADE;
