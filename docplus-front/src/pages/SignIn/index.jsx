import { useContext } from "react";
import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../../contexts/UserContext";
import authenticationApi from "../../services/authenticationApi";
import { Button, Container, Form, LinkButton } from "./style";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await mutate();
  }

  const { mutate, isLoading } = useMutation(() => authenticationApi.login({ email: form.email, password: form.password }), {
    onSuccess: (data) => {
      setUserData(data);
      toast("Logado com sucesso!");
      navigate("/dashboard/home");
    },
    onError: () => {
      toast("Email ou senha estão incorretos!");
    },
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Bem vindo ao DocPLUS</h1>

        <div>
          <label>Login</label>
          <input required onChange={(e) => handleInput(e)} name="email" value={form.email} type="text" placeholder="Digite seu email" />
        </div>

        <div>
          <label>Senha</label>
          <input required onChange={(e) => handleInput(e)} name="password" value={form.password} type="password" placeholder="Digite sua senha" />
        </div>

        <Button type="submit" className="login">
          {isLoading ? "Logando..." : "Logar"}
        </Button>
        <LinkButton to="/register" className="register">
          Registrar
        </LinkButton>
      </Form>
    </Container>
  );
}
