import { AppointmentMethod, AppointmentReason, AppointmentStatus, AppointmentType, Patient, PrismaClient } from "@prisma/client";
import faker from "@faker-js/faker";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
const prisma = new PrismaClient();

function getRandomBirthday() {
  return faker.date.between("1940-01-01T00:00:00.000Z", "2000-01-01T00:00:00.000Z");
}

function getRandomDateSixMonthsAgo() {
  const currentDate = new Date();
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate());

  return faker.date.between(sixMonthsAgo, currentDate);
}

function randomItem(arr: Array<Patient | AppointmentType | AppointmentMethod | AppointmentReason | AppointmentStatus>) {
  return arr[Math.floor(Math.random() * arr.length)].id;
}

async function main() {
  let gender = await prisma.gender.findFirst();
  let patient = await prisma.patient.findFirst();
  let medic = await prisma.medic.findFirst();
  let appointment = await prisma.appointment.findFirst();

  let appointmentType = await prisma.appointmentType.findFirst();
  let appointmentReason = await prisma.appointmentReason.findFirst();
  let appointmentStatus = await prisma.appointmentStatus.findFirst();
  let appointmentMethod = await prisma.appointmentMethod.findFirst();

  let genders;

  if (!appointmentType) {
    await prisma.appointmentType.createMany({
      data: [{ type: "Consulta" }, { type: "Periódico" }, { type: "Retorno" }, { type: "Outro" }],
    });
  }

  if (!appointmentReason) {
    await prisma.appointmentReason.createMany({
      data: [{ reason: "Consulta Particular" }, { reason: "Consulta Plano de Saúde" }, { reason: "Consulta Filantrópica" }],
    });
  }

  if (!appointmentStatus) {
    await prisma.appointmentStatus.createMany({
      data: [{ status: "Confirmar" }, { status: "Confirmado" }, { status: "Atendido" }, { status: "Faltou" }, { status: "Cancelado" }],
    });
  }

  if (!appointmentMethod) {
    await prisma.appointmentMethod.createMany({
      data: [{ method: "Compromisso Presencial" }, { method: "Teleconsulta" }],
    });
  }

  if (!medic) {
    medic = await prisma.medic.create({
      data: {
        name: faker.name.findName(),
        startHour: "8",
        endHour: "18",
        User: {
          create: {
            email: "email@hotmail.com",
            password: "123456",
          },
        },
      },
    });
  }

  if (!gender) {
    genders = await prisma.gender.createMany({
      data: [
        {
          gender: "Masculino",
        },
        {
          gender: "Feminino",
        },
      ],
    });
  }

  if (!patient) {
    for (let i = 0; i < 500; i++) {
      await prisma.patient.create({
        data: {
          name: faker.name.findName(),
          birthday: getRandomBirthday(),
          cpf: generateCPF(),
          phone: faker.phone.phoneNumber("(##) 9####-####"),
          genderId: gender?.id || 1,
          createdAt: getRandomDateSixMonthsAgo(),
        },
      });
    }
  }

  const patients = await prisma.patient.findMany({});
  const types = await prisma.appointmentType.findMany({});
  const reasons = await prisma.appointmentReason.findMany({});
  const status = await prisma.appointmentStatus.findMany({});
  const methods = await prisma.appointmentMethod.findMany({});

  if (!appointment) {
    const date = new Date();
    date.setHours(0, 0, 0);

    for (let i = 0; i < 7; i++) {
      for (let j = Number(medic.startHour) - 3; j <= Number(medic.endHour) - 3; j++) {
        date.setHours(j, 0, 0, 0);
        await prisma.appointment.create({
          data: {
            medicId: medic.id,
            patientId: randomItem(patients),
            typeId: randomItem(types),
            reasonId: randomItem(reasons),
            methodId: randomItem(methods),
            statusId: randomItem(status),
            duration: "30",
            date: new Date(date),
          },
        });
        date.setHours(j, 30, 0, 0);
        await prisma.appointment.create({
          data: {
            medicId: medic.id,
            patientId: randomItem(patients),
            typeId: randomItem(types),
            reasonId: randomItem(reasons),
            methodId: randomItem(methods),
            statusId: randomItem(status),
            duration: "30",
            date: new Date(date),
          },
        });
      }

      date.setDate(date.getDate() + 1);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
