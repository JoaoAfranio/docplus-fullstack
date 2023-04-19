import { BsFillPersonFill } from "react-icons/bs";
import { BoxInput, Button, Container, Icon, InputSearch, Title } from "./style";
import { BiSearch } from "react-icons/bi";
import Table from "./Table";
import { useEffect, useState } from "react";
import ModalPatient from "../../components/ModalPatient";
import { useQuery } from "react-query";
import patientApi from "../../services/patientApi";

export default function Patient() {
  const { data, isLoading, isError } = useQuery("list-patients", patientApi.getPatients);
  const [input, setInput] = useState("");
  const [filterPatients, setFilterPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFilterPatients(data);
  }, [data]);

  function handleInput(e) {
    const value = e.target.value;
    if (value === "") {
      setFilterPatients(data);
      return;
    }

    setInput(value);
    const filter = filterPatients.filter((p) => {
      return p.name.toLowerCase().includes(value) || p.phone.includes(value) || p.cpf.includes(value);
    });

    setFilterPatients(filter);
  }

  return (
    <Container>
      <Title>
        <div>
          <BsFillPersonFill /> Pacientes
        </div>

        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          + Novo Paciente
        </Button>
      </Title>

      <BoxInput>
        <InputSearch
          minLength={2}
          debounceTimeout={300}
          placeholder="Busque pelo nome, celular, telefone ou CPF"
          value={input}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <Icon>
          <BiSearch />
        </Icon>
      </BoxInput>

      <Table patients={filterPatients} />
      <ModalPatient show={showModal} setShow={setShowModal} />
    </Container>
  );
}
