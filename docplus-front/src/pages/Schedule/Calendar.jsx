import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";
import scheduleApi from "../../services/scheduleApi";
import { useQuery } from "react-query";
import { colorsSituation } from "../../assets/css/ColorsSituation";
import ModalAppointment from "../../components/ModalAppointment";
import UserContext from "../../contexts/UserContext";

export default function Calendar() {
  const [dates, setDates] = useState([]);
  const [hours, setHours] = useState([]);
  const { data, isLoading, isError } = useQuery("list-schedule", scheduleApi.getSchedule);
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const dates = getDatesUntilFriday();
    setDates(dates);
    getHours(Number(userData.user.Medic.startHour), Number(userData.user.Medic.endHour));
  }, [userData]);

  if (isLoading) return <h1>Carregando...</h1>;

  function getDatesUntilFriday() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const offset = (dayOfWeek + 6) % 7;
    const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - offset);

    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
      const day = date.toLocaleString("default", { weekday: "long" }).slice(0, 3);
      dates.push({ day, date });
    }

    return dates;
  }

  function getHours(startHour, endHour) {
    const newHours = [...hours];
    for (let i = startHour; i <= endHour; i++) {
      const hour = `${i}`.padStart(2, "0") + ":00";
      newHours.push(hour);
    }
    setHours(newHours);
  }

  function renderBox(appointments, hour) {
    const arrayBox = [];

    for (const date in appointments) {
      const MountBox = [];

      for (const appointment of appointments[date]) {
        const colorBox = colorsSituation[appointment.AppointmentStatus.status];

        const date = new Date(appointment.date);
        const end = new Date(date.getTime() + appointment.duration * 60000);
        const startHour = date.getUTCHours().toString().padStart(2, "0") + ":" + date.getUTCMinutes().toString().padStart(2, "0");
        const endHour = end.getUTCHours().toString().padStart(2, "0") + ":" + end.getUTCMinutes().toString().padStart(2, "0");

        const Info = (
          <Box
            key={appointment.id}
            onClick={() => {
              setAppointment(appointment);
              setShowModal(true);
            }}
            situation={colorBox}
          >
            <p>
              ({startHour} - {endHour})
            </p>
            <p>{appointment.Patient.name}</p>
          </Box>
        );

        MountBox.push(Info);
      }

      arrayBox.push(MountBox);
    }

    const spanTd = [];

    for (let i = 0; i < 5 - arrayBox.length; i++) {
      spanTd.push(<td className="width" />);
    }

    const mountedRow = (
      <tr>
        <th>{hour}</th>
        {arrayBox.length ? (
          arrayBox.map((a, idx) => (
            <td key={idx} className="width">
              {a}
            </td>
          ))
        ) : (
          <td className="width">
            <span></span>
          </td>
        )}
        {arrayBox.length < 5 && Array.from({ length: 5 - arrayBox.length }).map((_, i) => <td className="width" key={i}></td>)}
      </tr>
    );

    return mountedRow;
  }

  return (
    <>
      <TableContent>
        <thead>
          <tr>
            <th></th>
            {dates.map((d, idx) => (
              <th key={idx} className="headerDay">
                <p className="weekday">{d.day}.</p>
                <p className="day">{d.date.getDate()}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((h) => {
            return renderBox(data[h], h);
          })}
        </tbody>
      </TableContent>
      <ModalAppointment show={showModal} setShow={setShowModal} isUpdate={true} appointment={appointment} />
    </>
  );
}

const TableContent = styled.table`
  border-collapse: collapse;
  border: 1px solid #dddddd;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  color: ${COLORS.MEDIUM_GREY};
  position: relative;

  tr {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .headerDay {
    padding: 20px 0px;
  }

  .weekday {
    font-size: 11px;
    letter-spacing: 0.8px;
  }

  .day {
    font-size: 26px;
  }

  .width {
    width: 100%;
  }

  td:first-child,
  th:first-child {
    position: absolute;
    left: -40px;
    font-size: 12px;
  }

  td,
  th {
    display: flex;
    flex-direction: column;
    text-align: center;
    position: relative;

    gap: 5px;
    font-size: 14px;
    text-transform: uppercase;
  }

  td:not(:first-child),
  th:not(:first-child) {
    border: 1px solid #dddddd;
  }

  thead > tr > th {
    border: none !important;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
  width: 95%;
  height: 45px;
  margin: 5px;

  cursor: pointer;

  border-radius: 8px;

  font-weight: bold;
  color: #ffffff;
  letter-spacing: 1px;

  background-color: ${(props) => props.situation};
`;
