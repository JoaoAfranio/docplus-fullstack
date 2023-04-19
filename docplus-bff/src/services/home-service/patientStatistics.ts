import axios from "axios";

async function getPatientsStatistics(authorization: string) {
  const baseURL = process.env.API_BASE_URL;
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  const { data } = await axios.get(`${baseURL}/patients`, config);
  const countPatients = countNewPatientsSixMonthAgo(data);
  const countPatientByAge = countPatientsByAge(data);
  const countPatientByGender = countPatientsByGender(data);
  return {
    totalPatients: data.length,
    newPatients: formatDataToGraphic(countPatients),
    patientsByAge: formatDataToGraphic(countPatientByAge),
    patientsByGender: formatDataToGraphic(countPatientByGender),
  };
}

function countNewPatientsSixMonthAgo(patients: Patient[]) {
  const ordenedPatients = orderByDate(patients);
  const filterPatients = filterSixMonthAgo(ordenedPatients);
  const hashMonth: { [id: string]: number } = {};

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  for (const patient of filterPatients) {
    const date = new Date(patient.createdAt);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${months[month]}/${year}`;
    !hashMonth[key] ? (hashMonth[key] = 1) : hashMonth[key]++;
  }

  return hashMonth;
}

function orderByDate(array: Patient[]) {
  return array.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

function orderByBirthday(array: Patient[]) {
  return array.sort((a, b) => {
    return new Date(b.birthday).getTime() - new Date(a.birthday).getTime();
  });
}

function filterSixMonthAgo(array: Patient[]) {
  const today = new Date();
  const sixMonthAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

  return array.filter((p) => new Date(p.createdAt) >= sixMonthAgo);
}

function countPatientsByAge(patients: Patient[]) {
  const ordenedPatients = orderByBirthday(patients);
  const hashCountByAge: { [id: string]: number } = {};

  ordenedPatients.forEach((patient) => {
    const today = new Date();
    const birthday = new Date(patient.birthday);
    const age = today.getFullYear() - birthday.getFullYear();
    const rangeAge = Math.floor(age / 10) * 10;
    const key = `${rangeAge - 10} - ${rangeAge}`;
    if (!hashCountByAge[key]) {
      hashCountByAge[key] = 0;
    }
    hashCountByAge[key]++;
  });

  return hashCountByAge;
}

function countPatientsByGender(patients: Patient[]) {
  const hashCountByGender: { [id: string]: number } = {};

  patients.forEach((patient) => {
    const key = patient.Gender.gender;
    if (!hashCountByGender[key]) {
      hashCountByGender[key] = 0;
    }
    hashCountByGender[key]++;
  });

  return hashCountByGender;
}

function formatDataToGraphic(object: Object) {
  const labels = Object.entries(object).map(([label, _]) => label);
  const values = Object.entries(object).map(([_, value]) => value);

  return { labels, values };
}

type Patient = {
  id: number;
  name: string;
  cpf: string;
  phone: string;
  birthday: Date;
  genderId: number;
  createdAt: Date;
  updatedAt: Date;
  Gender: { id: string; gender: string };
};

export { getPatientsStatistics };
