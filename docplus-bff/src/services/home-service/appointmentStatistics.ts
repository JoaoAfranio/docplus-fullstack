import axios from "axios";

async function getAppointmentsStatistics(authorization: string) {
  const baseURL = process.env.API_BASE_URL;
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  console.log(baseURL);

  const { data } = await axios.get(`${baseURL}/appointments`, config);

  const filterAppointments = filterAppointment(data, filterSixMonthAgo);
  const filterStatusConfirmed = filterAppointment(data, filterByStatus, "Confirmado");
  const filterStatusCanceled = filterAppointment(data, filterByStatus, "Faltou");

  return {
    totalAppointments: data.length,
    scheduleAppointments: formatDataToGraphic(filterAppointments),
    appointmentsConfirmed: formatDataToGraphic(filterStatusConfirmed),
    appointmentsCanceled: formatDataToGraphic(filterStatusCanceled),
  };
}

function filterAppointment(array: Appointment[], filterFunction: Function, filterOptions?: string) {
  const ordenedAppointments = orderByDate(array);
  const filterAppointments = filterFunction(ordenedAppointments, filterOptions);
  const hashMonth: { [id: string]: number } = {};

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  for (const item of filterAppointments) {
    const date = new Date(item.date);
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${months[month]}/${year}`;
    !hashMonth[key] ? (hashMonth[key] = 1) : hashMonth[key]++;
  }

  return hashMonth;
}

function orderByDate(array: Appointment[]) {
  return array.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

function filterSixMonthAgo(array: Appointment[]) {
  const today = new Date();
  const sixMonthAgo = new Date(today.getFullYear(), today.getMonth() - 5, 1);

  return array.filter((p) => new Date(p.createdAt) >= sixMonthAgo);
}

function filterByStatus(array: Appointment[], status: string) {
  return array.filter((p) => p.AppointmentStatus.status === status);
}

function formatDataToGraphic(object: Object) {
  const labels = Object.entries(object).map(([label, _]) => label);
  const values = Object.entries(object).map(([_, value]) => value);

  return { labels, values };
}

type Appointment = {
  id: number;
  date: string | Date;
  duration: string;
  medicId: number;
  patientId: number;
  AppointmentMethod: {
    id: number;
    method: string;
  };
  AppointmentType: {
    id: number;
    type: string;
  };
  AppointmentStatus: {
    id: number;
    status: string;
  };
  AppointmentReason: {
    id: number;
    reason: string;
  };
  createdAt: string | Date;
  updatedAt: string | Date;
};

export { getAppointmentsStatistics };
