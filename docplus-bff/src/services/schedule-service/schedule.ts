import axios from "axios";

async function getSchedule(authorization: string) {
  const baseURL = process.env.API_BASE_URL;
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  const { data } = await axios.get(`${baseURL}/appointments`, config);
  const filterAppointments = filterAppointmentsCurrentWeek(data);
  const ordenedAppointments = orderByDate(filterAppointments);
  const scheduleData = groupAppointmentsByHour(ordenedAppointments);

  return scheduleData;
}

function orderByDate(array: Appointment[]) {
  return array.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

function filterAppointmentsCurrentWeek(appointments: Appointment[]) {
  const { monday, friday } = getMondayAndFriday();
  return appointments.filter((a) => new Date(a.date) >= monday && new Date(a.date) <= friday);
}

function getMondayAndFriday() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // adjust when day is Sunday
  const monday = new Date(today.setDate(diff));
  const friday = new Date(today.setDate(monday.getDate() + 4));

  monday.setHours(0, 0, 0);
  friday.setHours(23, 59, 59);
  return { monday, friday };
}

function groupAppointmentsByHour(appointments: Appointment[]) {
  const groupedAppointments: GroupedAppointments = appointments.reduce((acc: GroupedAppointments, appointment: Appointment) => {
    const date = new Date(appointment.date);
    const hour = `${date.getUTCHours().toString().padStart(2, "0")}:00`;
    const day = date.toLocaleDateString();

    if (!acc[hour]) {
      acc[hour] = {};
    }

    if (!acc[hour][day]) {
      acc[hour][day] = [];
    }

    acc[hour][day].push(appointment);

    return acc;
  }, {});

  return groupedAppointments;
}

type GroupedAppointments = {
  [hour: string]: {
    [day: string]: Appointment[];
  };
};

type Appointment = {
  id: number;
  date: string | Date;
};

export { getSchedule };
