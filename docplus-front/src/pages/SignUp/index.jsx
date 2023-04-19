import { useState } from "react";
import { BoxHour, Button, Container, Form, LinkButton } from "./style";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import authenticationApi from "../../services/authenticationApi";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", startHour: "", endHour: "" });
  const navigate = useNavigate();

  function handleInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast("As senhas devem ser iguais!");
    }

    mutate();
  }

  const { mutate, isLoading } = useMutation(
    () => authenticationApi.register({ name: form.name, email: form.email, password: form.password, startHour: form.startHour, endhour: form.endHour }),
    {
      onSuccess: () => {
        toast("Inscrito com sucesso! Por favor, faça login.");
        navigate("/");
      },
      onError: () => {
        toast("Algo aconteceu! Por favor, tente novamente.");
      },
    }
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input onChange={(e) => handleInput(e)} required type="text" placeholder="Digite seu nome" name="name" value={form.name} />
        </div>

        <div>
          <label>Email</label>
          <input onChange={(e) => handleInput(e)} required type="email" placeholder="Digite seu email" name="email" value={form.email} />
        </div>

        <div>
          <label>Senha</label>
          <input onChange={(e) => handleInput(e)} required type="password" placeholder="Digite sua senha" name="password" value={form.password} />
        </div>

        <div>
          <label>Confirme a senha</label>
          <input onChange={(e) => handleInput(e)} required type="password" placeholder="Confirme a senha" name="confirmPassword" value={form.confirmPassword} />
        </div>

        <BoxHour>
          <label>Hora de Inicio do Atendimento</label>
          <input onChange={(e) => handleInput(e)} required type="number" placeholder="Hora Inicio" name="startHour" value={form.startHour} />
          <label>Hora Final do Atendimento</label>
          <input onChange={(e) => handleInput(e)} required type="number" placeholder="Hora Final" name="endHour" value={form.endHour} />
        </BoxHour>

        <Button disabled={isLoading} type="submit" className="register">
          {isLoading ? "Enviando os dados..." : "Registrar"}
        </Button>
        <LinkButton to="/" className="login">
          Voltar para o Login
        </LinkButton>
      </Form>
    </Container>
  );
}
