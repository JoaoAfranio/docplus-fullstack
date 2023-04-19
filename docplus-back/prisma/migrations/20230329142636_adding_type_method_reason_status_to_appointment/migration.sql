/*
  Warnings:

  - Added the required column `methodId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reasonId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "methodId" INTEGER NOT NULL,
ADD COLUMN     "reasonId" INTEGER NOT NULL,
ADD COLUMN     "statusId" INTEGER NOT NULL,
ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "AppointmentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "AppointmentMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "AppointmentStatus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_reasonId_fkey" FOREIGN KEY ("reasonId") REFERENCES "AppointmentReason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
