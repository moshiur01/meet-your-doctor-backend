/*
  Warnings:

  - You are about to drop the `medicines_for+patients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `patient_priscriptiopn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "medicines_for+patients" DROP CONSTRAINT "medicines_for+patients_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "patient_priscriptiopn" DROP CONSTRAINT "patient_priscriptiopn_appointment_id_fkey";

-- DropTable
DROP TABLE "medicines_for+patients";

-- DropTable
DROP TABLE "patient_priscriptiopn";

-- CreateTable
CREATE TABLE "medicines_for_patients" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,

    CONSTRAINT "medicines_for_patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_prescription" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "appointment_id" TEXT NOT NULL,

    CONSTRAINT "patient_prescription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medicines_for_patients_appointment_id_key" ON "medicines_for_patients"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "patient_prescription_appointment_id_key" ON "patient_prescription"("appointment_id");

-- AddForeignKey
ALTER TABLE "medicines_for_patients" ADD CONSTRAINT "medicines_for_patients_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_prescription" ADD CONSTRAINT "patient_prescription_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
