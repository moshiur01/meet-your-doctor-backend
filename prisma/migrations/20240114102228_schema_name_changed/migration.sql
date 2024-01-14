/*
  Warnings:

  - You are about to drop the column `image` on the `admins` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `patients` table. All the data in the column will be lost.
  - Added the required column `photo` to the `admins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "admins" DROP COLUMN "image",
ADD COLUMN     "photo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "patients" DROP COLUMN "full_name",
ADD COLUMN     "name" TEXT NOT NULL;
