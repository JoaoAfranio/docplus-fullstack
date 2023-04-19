import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;

  width: 500px;
  height: 500px;
  padding: 40px;

  background-color: #ffffff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  border-radius: 18px;

  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 12px;

  h1 {
    margin-bottom: 30px;
    text-align: center;
    font-size: 18px;
    color: ${COLORS.GREEN};
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    padding: 10px;
    border: 1px solid ${COLORS.GREY};
  }
`;

const Button = styled.button`
  padding: 15px 10px;

  cursor: pointer;

  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  border: none;
  border-radius: 18px;

  &:active {
    transform: scale(0.98);
  }

  &.login {
    background-color: ${COLORS.DARKER_BLUE};
    border-bottom: 5px solid #3f22ec;
  }

  &.register {
    background-color: ${COLORS.GREEN};
    border-bottom: 5px solid #40890a;
  }
`;

const LinkButton = styled(Link)`
  padding: 15px 10px;

  cursor: pointer;

  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  border: none;
  border-radius: 18px;

  &:active {
    transform: scale(0.98);
  }

  &.login {
    background-color: ${COLORS.DARKER_BLUE};
    border-bottom: 5px solid #3f22ec;
  }

  &.register {
    background-color: ${COLORS.GREEN};
    border-bottom: 5px solid #40890a;
  }
`;

export { Container, Form, Button, LinkButton };
