import { useState } from "react";
import ModalAppointment from "../../components/ModalAppointment";
import Calendar from "./Calendar";
import { Button, Container } from "./style";

export default function Schedule() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Button
        onClick={() => {
          setShowModal(true);
        }}
      >
        + Nova Consulta
      </Button>
      <Calendar />
      <ModalAppointment show={showModal} setShow={setShowModal} />
    </Container>
  );
}
