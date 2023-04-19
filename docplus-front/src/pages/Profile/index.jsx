import { BsFillPersonLinesFill } from "react-icons/bs";
import { Button, Container, Content, Input, InputGroup, Label, Title } from "./style";
import userApi from "../../services/userApi";
import { useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Profile() {
  const [form, setForm] = useState({ id: 0, name: "", email: "", password: "", confirmPassword: "", startHour: "", endHour: "" });
  const { data } = useQuery("profile-user", userApi.getUser);

  const { mutate, isLoading } = useMutation((user) => userApi.updateUser(user), {
    onSuccess: () => {
      toast("Usuário atualizado com sucesso!");
    },
    onError: () => {
      toast("Email ou senha estão incorretos!");
    },
  });

  useEffect(() => {
    if (data) {
      const { Medic } = data;
      setForm({ id: data.id, name: Medic.name, email: data.email, startHour: Medic.startHour, endHour: Medic.endHour });
    }
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("As senhas devem ser iguais");
      return;
    }

    mutate({
      id: form.id,
      name: form.name,
      email: form.email,
      password: form.password,
      startHour: form.startHour,
      endHour: form.endHour,
    });
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Title>
        <BsFillPersonLinesFill />
        Atualizar Perfil
      </Title>

      <Content>
        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" placeholder="Seu nome" name="name" value={form.name} onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <Label>Email</Label>
          <Input type="email" placeholder="Seu email" name="email" value={form.email} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <Label>Alterar Senha</Label>
          <Input type="password" placeholder="Senha Nova" name="password" value={form.password} onChange={handleChange} />
          <Input type="password" placeholder="Confirmar Senha" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
        </InputGroup>

        <InputGroup>
          <Label>Hora de Início do Atendimento</Label>
          <Input type="number" min="0" max="23" name="starHour" value={form.startHour} onChange={handleChange} />

          <Label>Hora Final do Atendimento</Label>
          <Input type="text" min="0" max="23" name="endHour" value={form.endHour} onChange={handleChange} />
        </InputGroup>

        <Button>Salvar Alterações</Button>
      </Content>
    </Container>
  );
}
