import { Container, Content, Title, Box, BoxGraph } from "./style";
import { BsFillPersonFill, BsFillArrowUpCircleFill, BsGenderAmbiguous } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";
import Info from "./Info";
import { useState } from "react";
import { useQuery } from "react-query";
import GraphPie from "./GraphPie";
import GraphLine from "./GraphLine";
import GraphBar from "./GraphBar";
import patientApi from "../../services/patientApi";

export default function GraphicPatients() {
  const [active, setActive] = useState("");
  const { data, isLoading, isError } = useQuery("graphic-patients", patientApi.getGraphicPatientData);
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

  return (
    <Container>
      <Title>
        <BsFillPersonFill /> Pacientes
      </Title>
      <Content>
        {!isLoading && (
          <>
            <Box>
              <Info icon={<IoPeopleSharp />} description={"Total"} data={data?.totalPatients} />
              <Info
                setElementActive={() => {
                  setElementActive("newPatients");
                }}
                icon={<BsFillArrowUpCircleFill />}
                isActive={active === "newPatients" ? true : false}
                description={"Novos Pacientes"}
                data={data?.newPatients.values[0]}
              />
              <Info
                setElementActive={() => {
                  setElementActive("patientsByAge");
                }}
                icon={<FaBirthdayCake />}
                isActive={active === "patientsByAge" ? true : false}
                description={"Distribuição por"}
                data={"Idade"}
              />
              <Info
                setElementActive={() => {
                  setElementActive("patientsByGender");
                }}
                icon={<BsGenderAmbiguous />}
                isActive={active === "patientsByGender" ? true : false}
                description={"Distribuição por"}
                data={"Gênero"}
              />
            </Box>
            <BoxGraph>
              {active === "patientsByGender" && <GraphPie labels={labels} name={"Pacientes por Gênero"} arrayData={values} />}
              {active === "newPatients" && <GraphLine labels={labels} name={"Novos Pacientes"} arrayData={values} />}
              {active === "patientsByAge" && <GraphBar labels={labels} name={"Pacientes por idade"} arrayData={values} />}
            </BoxGraph>
          </>
        )}
      </Content>
    </Container>
  );
}
