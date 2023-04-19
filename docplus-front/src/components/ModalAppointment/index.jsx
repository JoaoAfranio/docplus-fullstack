import { BoxDate, InputGroup, InputMinute, Icon } from "./style";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaNotesMedical } from "react-icons/fa";
import { BsCalendarCheck, BsFillPersonFill } from "react-icons/bs";
import { GiMedicalPack } from "react-icons/gi";
import ModalComponent from "../Modal";
import appointmentApi from "../../services/appointmentApi";
import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Select from "react-select";

import patientApi from "../../services/patientApi";
import UserContext from "../../contexts/UserContext";

export default function ModalAppointment({ show, setShow, isUpdate, appointment }) {
  const [form, setForm] = useState({ date: "", hour: "", duration: "", name: "", patientId: 0, typeId: 0, methodId: 0, statusId: 0, reasonId: 0 });
  const [listPatients, setListPatients] = useState([]);
  const { data } = useQuery("types-appointment", appointmentApi.getAppointmentTypes);
  const { data: dataPatients } = useQuery("list-patients", patientApi.getPatients);
  const title = isUpdate ? "Atualizar Agendamento" : "Novo Agendamento";
  const { userData } = useContext(UserContext);

  const queryClient = useQueryClient();

  useEffect(() => {
    const hour = formattedHours();
    const date = appointment?.date.substr(0, 10);

    setForm({
      date: date,
      hour: hour || "00:00",
      name: appointment?.name,
      typeId: appointment?.typeId || data?.types[0].id,
      methodId: appointment?.methodId || data?.methods[0].id,
      statusId: appointment?.statusId || data?.status[0].id,
      reasonId: appointment?.reasonId || data?.reasons[0].id,
    });
  }, [appointment]);

  useEffect(() => {
    const arrayPatients = dataPatients?.map((patient) => {
      return {
        value: patient,
        label: patient.name,
      };
    });
    setListPatients(arrayPatients);
  }, [dataPatients]);

  function formattedHours() {
    if (!appointment) return;
    const date = new Date(appointment?.date);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleChangePatient(e) {
    const patientId = e.value.id;
    setForm({ ...form, patientId: patientId });
  }

  const dataUpsertAppointment = {
    id: appointment?.id,
    date: form.date || appointment?.date,
    hour: form.hour,
    duration: form.duration || appointment?.duration,
    medicId: userData.user.Medic.id || appointment?.medicId,
    patientId: form.patientId || appointment?.patientId,
    typeId: Number(form.typeId),
    methodId: Number(form.methodId),
    reasonId: Number(form.reasonId),
    statusId: Number(form.statusId),
  };

  const { mutate, isLoading } = useMutation(() => appointmentApi.upsertAppointment(dataUpsertAppointment), {
    onSuccess: () => {
      queryClient.invalidateQueries("next-appointments");
      queryClient.invalidateQueries("list-schedule");
      toast("Agendamento alterado com sucesso!");
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
          <AiOutlineCalendar className="icon" />
        </Icon>
        <BoxDate>
          <input disabled={isUpdate} type="date" onChange={handleChange} name="date" value={form.date} />
          <input disabled={isUpdate} type="text" onChange={handleChange} name="hour" value={form.hour} placeholder="08:00" />

          <InputMinute>
            <input disabled={isUpdate} type="text" onChange={handleChange} name="duration" className="minutes" placeholder="30" value={appointment?.duration} />
            <div>
              <p>min</p>
            </div>
          </InputMinute>
        </BoxDate>
      </InputGroup>

      {!isUpdate && (
        <InputGroup>
          <Icon>
            <BsFillPersonFill className="icon" />
          </Icon>
          <Select onChange={handleChangePatient} name="patient" className="input-search" placeholder="Digite nome do Paciente" options={listPatients} />
        </InputGroup>
      )}

      {isUpdate && (
        <InputGroup>
          <Icon>
            <BsFillPersonFill className="icon" />
          </Icon>
          <input type="text" disabled={isUpdate} className="input" value={appointment?.Patient.name} />
        </InputGroup>
      )}

      <InputGroup>
        <Icon>
          <FaNotesMedical className="icon" />
        </Icon>
        <select name="typeId" value={form.typeId} onChange={handleChange}>
          {data?.types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
      </InputGroup>

      <InputGroup>
        <Icon>
          <BsCalendarCheck className="icon" />
        </Icon>
        <select name="statusId" value={form.statusId} onChange={handleChange}>
          {data?.status.map((status) => (
            <option key={status.id} value={status.id}>
              {status.status}
            </option>
          ))}
        </select>
      </InputGroup>

      <InputGroup>
        <Icon>
          <GiMedicalPack className="icon" />
        </Icon>
        <select name="reasonId" value={form.reasonId} onChange={handleChange}>
          {data?.reasons.map((reason) => (
            <option key={reason.id} value={reason.id}>
              {reason.reason}
            </option>
          ))}
        </select>
      </InputGroup>

      <InputGroup>
        {data?.methods.map((method) => (
          <React.Fragment key={method.id}>
            <label>{method.method}</label>
            <input type="radio" name="methodId" value={method.id} checked={method.id === Number(form.methodId)} onChange={handleChange} />
          </React.Fragment>
        ))}
      </InputGroup>
    </ModalComponent>
  );
}
