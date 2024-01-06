/*
  Warnings:

  - You are about to drop the column `address` on the `medical_profiles` table. All the data in the column will be lost.
  - Added the required column `blood_group` to the `medical_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `permanent_address` to the `medical_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preset_address` to the `medical_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "medical_profiles" DROP COLUMN "address",
ADD COLUMN     "blood_group" TEXT NOT NULL,
ADD COLUMN     "permanent_address" TEXT NOT NULL,
ADD COLUMN     "preset_address" TEXT NOT NULL;
