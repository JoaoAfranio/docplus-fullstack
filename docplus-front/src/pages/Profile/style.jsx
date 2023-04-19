import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 100px 40px;
  height: 100%;
`;

const Title = styled.h1`
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border: 2px solid ${COLORS.GREY};
  border-radius: 10px;

  gap: 10px;
  padding: 10px;
  height: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;

  gap: 10px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Input = styled.input`
  padding: 15px 10px;
  border: 1px solid ${COLORS.GREY};
`;

const Label = styled.label`
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 12px;
`;

const Button = styled.button`
  padding: 15px 10px;
  height: 60px;
  margin-top: auto;
  margin-left: auto;

  cursor: pointer;

  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  border: none;
  border-radius: 18px;

  background-color: ${COLORS.GREEN};
  border-bottom: 5px solid #40890a;

  &:active {
    transform: scale(0.98);
  }
`;

export { Container, Title, Content, Input, Label, InputGroup, Button };
