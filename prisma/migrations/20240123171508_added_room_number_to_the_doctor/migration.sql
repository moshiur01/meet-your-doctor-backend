/*
  Warnings:

  - You are about to drop the column `doctorId` on the `room_numbers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomNumberId]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "room_numbers" DROP CONSTRAINT "room_numbers_doctorId_fkey";

-- DropIndex
DROP INDEX "room_numbers_doctorId_key";

-- AlterTable
ALTER TABLE "doctors" ADD COLUMN     "roomNumberId" TEXT;

-- AlterTable
ALTER TABLE "room_numbers" DROP COLUMN "doctorId";

-- CreateIndex
CREATE UNIQUE INDEX "doctors_roomNumberId_key" ON "doctors"("roomNumberId");

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_roomNumberId_fkey" FOREIGN KEY ("roomNumberId") REFERENCES "room_numbers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
