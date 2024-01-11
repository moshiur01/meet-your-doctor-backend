/*
  Warnings:

  - You are about to drop the column `available_doctor_id` on the `available_services` table. All the data in the column will be lost.
  - You are about to drop the `available_doctors` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slot_id,doctor_id,slot_date,service_id]` on the table `available_services` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `doctor_id` to the `available_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "available_doctors" DROP CONSTRAINT "available_doctors_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "available_doctors" DROP CONSTRAINT "available_doctors_slot_id_fkey";

-- DropForeignKey
ALTER TABLE "available_services" DROP CONSTRAINT "available_services_available_doctor_id_fkey";

-- DropIndex
DROP INDEX "available_services_slot_id_available_doctor_id_slot_date_se_key";

-- AlterTable
ALTER TABLE "available_services" DROP COLUMN "available_doctor_id",
ADD COLUMN     "doctor_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "available_doctors";

-- CreateIndex
CREATE UNIQUE INDEX "available_services_slot_id_doctor_id_slot_date_service_id_key" ON "available_services"("slot_id", "doctor_id", "slot_date", "service_id");

-- AddForeignKey
ALTER TABLE "available_services" ADD CONSTRAINT "available_services_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
