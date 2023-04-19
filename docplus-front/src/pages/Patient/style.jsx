import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";
import { DebounceInput } from "react-debounce-input";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 100px 40px;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 24px;
  font-weight: bold;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
`;

const BoxInput = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  border: 1px solid ${COLORS.GREY};
  background-color: ${COLORS.LIGHT_GREY};
`;

const Icon = styled.div`
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputSearch = styled(DebounceInput)`
  width: 90%;
  padding: 15px;
  outline: none;
  border: none;
  background-color: ${COLORS.LIGHT_GREY};
`;

const Button = styled.button`
  width: 200px;
  padding: 15px 10px;
  float: right;

  cursor: pointer;

  background-color: ${COLORS.DARKER_BLUE};

  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
  color: #ffffff;

  border-radius: 18px;
  border: none;
  border-bottom: 5px solid #3f22ec;

  &:active {
    transform: scale(0.98);
  }
`;

export { Container, Title, InputSearch, BoxInput, Icon, Button };
