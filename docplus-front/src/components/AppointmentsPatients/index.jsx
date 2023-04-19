import { useState } from "react";
import { BsCardList } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { BiBlock } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import { HiOutlineThumbUp } from "react-icons/hi";
import Info from "../GraphicPatients/Info";
import Graph from "./Graph";
import { Box, BoxGraph, Container, Content, Title } from "./style";
import { useQuery } from "react-query";
import appointmentApi from "../../services/appointmentApi";

export default function AppointmentsPatients() {
  const [active, setActive] = useState("total");
  const { data, isLoading, isError } = useQuery("graphic-appointments", appointmentApi.getGraphicAppointmentData);

  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);
  const [name, setName] = useState("");

  function setElementActive(e) {
    setActive(e);
    setName(e);
    const { labels, values } = data[e];
    setLabels(labels);
    setValues(values);
  }

  const graphicName = name === "scheduleAppointments" ? "Consultas Agendadas" : name === "appointmentsConfirmed" ? "Média Mensal" : "Faltas";

  return (
    <Container>
      <Title>
        <FaBook /> Consultas
      </Title>

      <Content>
        <BoxGraph>
          <Graph labels={labels} name={graphicName} arrayData={values} />
        </BoxGraph>

        <Box>
          <Info icon={<HiOutlineThumbUp />} description={"Realizadas"} data={data?.totalAppointments} />
          <Info
            setElementActive={() => {
              setElementActive("scheduleAppointments");
            }}
            icon={<AiOutlineCalendar />}
            isActive={active === "scheduleAppointments" ? true : false}
            description={"Agendadas"}
            data={data?.scheduleAppointments.values[0]}
          />
          <Info
            setElementActive={() => {
              setElementActive("appointmentsConfirmed");
            }}
            icon={<BsCardList />}
            isActive={active === "appointmentsConfirmed" ? true : false}
            description={"Média Mensal"}
            data={data?.appointmentsConfirmed.values[0]}
          />
          <Info
            setElementActive={() => {
              setElementActive("appointmentsCanceled");
            }}
            icon={<BiBlock />}
            isActive={active === "appointmentsCanceled" ? true : false}
            description={"Faltas"}
            data={data?.appointmentsCanceled.values[0]}
          />
        </Box>
      </Content>
    </Container>
  );
}
