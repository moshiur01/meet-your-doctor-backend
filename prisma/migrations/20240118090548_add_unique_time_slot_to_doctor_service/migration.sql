/*
  Warnings:

  - A unique constraint covering the columns `[slot_id]` on the table `doctor_services` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "doctor_services_slot_id_key" ON "doctor_services"("slot_id");
