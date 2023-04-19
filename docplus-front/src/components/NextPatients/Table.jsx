import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";
import ModalAppointment from "../ModalAppointment";
import BoxSituation from "./BoxSituation";

export default function Table({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [appointment, setAppointment] = useState();

  function formatHour(dateString) {
    const date = new Date(dateString);
    const formattedMinutes = date.getUTCMinutes().toString().padStart(2, "0");
    return `${date.getUTCHours()}:${formattedMinutes}`;
  }

  return (
    <Container>
      <TableContent>
        <tbody>
          <tr>
            <th>Horário</th>
            <th>Nome</th>
            <th>Situação</th>
          </tr>

          {data?.map((appointment, idx) => (
            <tr
              onClick={() => {
                setShowModal(true);
                setAppointment(appointment);
              }}
              key={idx}
            >
              <td>{formatHour(appointment.date)}</td>
              <td>{appointment.Patient.name}</td>
              <td>
                <BoxSituation situation={appointment.AppointmentStatus.status} />
              </td>
            </tr>
          ))}
        </tbody>

        <ModalAppointment show={showModal} setShow={setShowModal} isUpdate={true} appointment={appointment} />
      </TableContent>
    </Container>
  );
}

const Container = styled.div`
  max-height: 400px;
  overflow: auto;
`;

const TableContent = styled.table`
  border-collapse: collapse;
  width: 100%;

  max-height: 400px;
  overflow: auto;

  td,
  th {
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    text-align: left;
    padding: 12px 5px;
    font-size: 14px;
    cursor: pointer;
  }

  td:last-child,
  th:last-child {
    text-align: end;
  }

  tr:nth-child(even) {
    background-color: ${COLORS.LIGHT_BLUE};
  }

  tr:last-child > td {
    border-bottom: none;
  }
`;
