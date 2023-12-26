/*
  Warnings:

  - Added the required column `gender` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "image_url" TEXT NOT NULL;
