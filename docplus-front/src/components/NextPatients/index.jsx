import { Container, Content, Header, Subtitle, Title } from "./style";
import { AiOutlineSchedule } from "react-icons/ai";
import Table from "./Table";
import { useState } from "react";
import appointmentApi from "../../services/appointmentApi";
import { useQuery } from "react-query";

export default function NextPatients() {
  const [activeDay, setActiveDay] = useState("today");
  const { data, isLoading, isError } = useQuery("next-appointments", appointmentApi.getNextAppointmentData);

  return (
    <Container>
      <Title>
        <AiOutlineSchedule />
        Agenda
      </Title>
      <Content>
        <Header>
          <Subtitle
            onClick={() => {
              setActiveDay("today");
            }}
            className={activeDay === "today" ? "active" : ""}
          >
            Hoje
          </Subtitle>
          <Subtitle
            onClick={() => {
              setActiveDay("tomorrow");
            }}
            className={activeDay === "tomorrow" ? "active" : ""}
          >
            Amanhã
          </Subtitle>
        </Header>

        {activeDay === "today" && <Table data={data?.today} />}
        {activeDay === "tomorrow" && <Table data={data?.tomorrow} />}
      </Content>
    </Container>
  );
}
