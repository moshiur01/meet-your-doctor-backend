/*
  Warnings:

  - You are about to drop the column `full_name` on the `admins` table. All the data in the column will be lost.
  - Added the required column `name` to the `admins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "full_name",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "medicine_mans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "photo" TEXT NOT NULL DEFAULT 'https://i.pinimg.com/originals/bf/12/c0/bf12c05be7f73150f05115653979c510.png',
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'medicineMan',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicine_mans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "medicine_mans_email_key" ON "medicine_mans"("email");

-- CreateIndex
CREATE UNIQUE INDEX "medicine_mans_phoneNumber_key" ON "medicine_mans"("phoneNumber");
