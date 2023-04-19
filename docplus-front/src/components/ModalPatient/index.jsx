import { InputGroup, Icon } from "./style";
import { HiOutlineIdentification } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { AiFillPhone } from "react-icons/ai";
import ModalComponent from "../Modal";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import patientApi from "../../services/patientApi";
import { toast } from "react-toastify";

export default function ModalPatient({ show, setShow, isUpdate, patient }) {
  const [form, setForm] = useState({ name: "", cpf: "", phone: "", birthday: "", genderId: "" });
  const title = isUpdate ? "Atualizar Paciente" : "Cadastrar Paciente";

  const queryClient = useQueryClient();

  const { data } = useQuery("gender-patients", patientApi.getPatientGenders);

  const formattedDate = patient?.birthday.substr(0, 10);

  useEffect(() => {
    setForm({ name: patient?.name, cpf: patient?.cpf, phone: patient?.phone, birthday: formattedDate, genderId: patient?.genderId });
  }, [patient]);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  const dataUpsertPatient = {
    id: patient?.id,
    name: form.name,
    cpf: form.cpf,
    phone: form.phone,
    birthday: new Date(form.birthday),
    genderId: Number(form.genderId),
  };

  const { mutate, isLoading } = useMutation(() => patientApi.upsertPatient(dataUpsertPatient), {
    onSuccess: () => {
      queryClient.invalidateQueries("list-patients");
      toast("Paciente alterado com sucesso!");
      setShow(false);
    },
    onError: () => {
      toast("Ocorreu um erro! Tente novamente");
    },
  });

  return (
    <ModalComponent title={title} show={show} setShow={setShow} hasDelete={isUpdate} saveFunction={mutate}>
      <InputGroup>
        <Icon>
          <BsFillPersonFill className="icon" />
        </Icon>
        <input onChange={handleInput} type="text" className="input" placeholder="Nome" name="name" value={form.name} />
      </InputGroup>

      <InputGroup>
        <Icon>
          <HiOutlineIdentification className="icon" />
        </Icon>
        <input type="text" onChange={handleInput} className="input" placeholder="CPF" name="cpf" value={form.cpf} />
      </InputGroup>

      <InputGroup>
        <Icon>
          <HiOutlineIdentification className="icon" />
        </Icon>
        <input type="date" onChange={handleInput} className="input" name="birthday" value={form.birthday} />
      </InputGroup>

      <InputGroup>
        <Icon>
          <AiFillPhone className="icon" />
        </Icon>
        <input type="text" onChange={handleInput} className="input" placeholder="Celular" name="phone" value={form.phone} />
      </InputGroup>

      <InputGroup>
        <Icon>
          <HiOutlineIdentification className="icon" />
        </Icon>
        <select name="genderId" value={form.genderId} onChange={handleInput}>
          {data?.map((gender) => (
            <option key={gender.id} value={gender.id}>
              {gender.gender}
            </option>
          ))}
        </select>
      </InputGroup>
    </ModalComponent>
  );
}
