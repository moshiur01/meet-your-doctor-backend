/*
  Warnings:

  - You are about to drop the column `available_service_id` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `qualification` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the `available_services` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `medical_profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `services` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctor_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_service_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_id` to the `appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day` to the `time_slots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_id` to the `time_slots` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_time` to the `time_slots` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointments" DROP CONSTRAINT "appointments_available_service_id_fkey";

-- DropForeignKey
ALTER TABLE "available_services" DROP CONSTRAINT "available_services_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "available_services" DROP CONSTRAINT "available_services_service_id_fkey";

-- DropForeignKey
ALTER TABLE "available_services" DROP CONSTRAINT "available_services_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "medical_profiles" DROP CONSTRAINT "medical_profiles_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "services" DROP CONSTRAINT "services_specialization_id_fkey";

-- DropIndex
DROP INDEX "doctors_phone_number_key";

-- DropIndex
DROP INDEX "patients_phone_number_key";

-- AlterTable
ALTER TABLE "appointments" DROP COLUMN "available_service_id",
ADD COLUMN     "doctor_id" TEXT NOT NULL,
ADD COLUMN     "doctor_service_id" TEXT NOT NULL,
ADD COLUMN     "slot_id" TEXT NOT NULL,
ALTER COLUMN "appointment_date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "full_name",
DROP COLUMN "phone_number",
DROP COLUMN "qualification",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "avg_rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "education" TEXT[],
ADD COLUMN     "experience" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "total_Rating" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "gender" DROP NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "phone_number",
ADD COLUMN     "bloodType" TEXT,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "time_slots" ADD COLUMN     "day" TEXT NOT NULL,
ADD COLUMN     "doctor_id" TEXT NOT NULL,
ADD COLUMN     "end_time" TEXT NOT NULL;

-- DropTable
DROP TABLE "available_services";

-- DropTable
DROP TABLE "medical_profiles";

-- DropTable
DROP TABLE "services";

-- CreateTable
CREATE TABLE "doctor_services" (
    "id" TEXT NOT NULL,
    "available_seats" INTEGER NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "fees" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,

    CONSTRAINT "doctor_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicines_for+patients" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,

    CONSTRAINT "medicines_for+patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_priscriptiopn" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,

    CONSTRAINT "patient_priscriptiopn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medicines_for+patients_appointment_id_key" ON "medicines_for+patients"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_priscriptiopn_appointment_id_key" ON "patient_priscriptiopn"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_phone_key" ON "doctors"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "patients_phone_key" ON "patients"("phone");

-- AddForeignKey
ALTER TABLE "time_slots" ADD CONSTRAINT "time_slots_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_services" ADD CONSTRAINT "doctor_services_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "time_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_service_id_fkey" FOREIGN KEY ("doctor_service_id") REFERENCES "doctor_services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "time_slots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "medicines_for+patients" ADD CONSTRAINT "medicines_for+patients_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_priscriptiopn" ADD CONSTRAINT "patient_priscriptiopn_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
