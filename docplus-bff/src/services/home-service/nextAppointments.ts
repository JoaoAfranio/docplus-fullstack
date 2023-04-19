import axios from "axios";

async function getNextAppointments(authorization: string) {
  const baseURL = process.env.API_BASE_URL;
  const config = {
    headers: {
      Authorization: authorization,
    },
  };

  const { data } = await axios.get(`${baseURL}/appointments`, config);

  const ordenedAppointment = orderByDate(data);

  const today = new Date();
  const filterToday = filterByDate(ordenedAppointment, today);
  today.setDate(today.getDate() + 1);
  const filterTomorrow = filterByDate(ordenedAppointment, today);

  return { today: filterToday, tomorrow: filterTomorrow };
}

function filterByDate(appointments: Appointment[], date: Date) {
  return appointments.filter((a) => compareDate(a.date, date));
}

function orderByDate(array: Appointment[]) {
  return array.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
}

function compareDate(dateApppoint: string | Date, dateComp: Date) {
  const date = new Date(dateApppoint);

  const date1 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const date2 = new Date(dateComp.getFullYear(), dateComp.getMonth(), dateComp.getDate());

  return date1.getTime() === date2.getTime();
}

type Appointment = {
  id: number;
  date: Date;
};

export { getNextAppointments };
