import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow-y: auto;
  width: 100%;
  gap: 20px;
  padding: 80px 40px;
  margin-left: 30px;
`;

const Button = styled.div`
  width: 200px;
  padding: 15px 10px;

  cursor: pointer;

  background-color: ${COLORS.DARKER_BLUE};

  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  border-radius: 18px;
  border-bottom: 5px solid #3f22ec;

  &:active {
    transform: scale(0.98);
  }
`;

export { Container, Button };
