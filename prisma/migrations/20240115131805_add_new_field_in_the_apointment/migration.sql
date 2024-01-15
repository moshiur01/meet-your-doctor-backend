/*
  Warnings:

  - You are about to drop the `patient_prescription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "patient_prescription" DROP CONSTRAINT "patient_prescription_appointment_id_fkey";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "prescription_link" TEXT;

-- DropTable
DROP TABLE "patient_prescription";
