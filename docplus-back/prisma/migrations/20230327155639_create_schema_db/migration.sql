-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medic" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "genderId" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "gender" VARCHAR(255) NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    CONSTRAINT "AppointmentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentMethod" (
    "id" SERIAL NOT NULL,
    "method" VARCHAR(255) NOT NULL,

    CONSTRAINT "AppointmentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentStatus" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(255) NOT NULL,

    CONSTRAINT "AppointmentStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentReason" (
    "id" SERIAL NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "AppointmentReason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "medicId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medic_userId_key" ON "Medic"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_cpf_key" ON "Patient"("cpf");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medic" ADD CONSTRAINT "Medic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_medicId_fkey" FOREIGN KEY ("medicId") REFERENCES "Medic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
