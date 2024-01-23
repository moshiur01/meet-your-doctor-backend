/*
  Warnings:

  - You are about to drop the `roomNumber` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roomNumber" DROP CONSTRAINT "roomNumber_doctorId_fkey";

-- DropTable
DROP TABLE "roomNumber";

-- CreateTable
CREATE TABLE "room_numbers" (
    "id" TEXT NOT NULL,
    "room_number" TEXT NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "doctorId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "room_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "room_numbers_doctorId_key" ON "room_numbers"("doctorId");

-- AddForeignKey
ALTER TABLE "room_numbers" ADD CONSTRAINT "room_numbers_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
