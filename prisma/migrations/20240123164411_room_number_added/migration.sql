-- CreateTable
CREATE TABLE "roomNumber" (
    "id" TEXT NOT NULL,
    "room_number" TEXT NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "doctorId" TEXT NOT NULL,

    CONSTRAINT "roomNumber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roomNumber_doctorId_key" ON "roomNumber"("doctorId");

-- AddForeignKey
ALTER TABLE "roomNumber" ADD CONSTRAINT "roomNumber_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
