/*
  Warnings:

  - You are about to drop the column `status` on the `appointments` table. All the data in the column will be lost.
  - Added the required column `appointment_status` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "status",
ADD COLUMN     "appointment_status" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "medical_profiles" ALTER COLUMN "profile_picture" DROP NOT NULL;
