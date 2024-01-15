/*
  Warnings:

  - The `education` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `experience` column on the `doctors` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "education",
ADD COLUMN     "education" JSONB[],
DROP COLUMN "experience",
ADD COLUMN     "experience" JSONB[];
