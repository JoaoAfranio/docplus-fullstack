import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const BoxDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const InputMinute = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #dadada;
  background-color: #eeeeee;

  width: 30%;

  div {
    margin: auto;
  }

  .minutes {
    border: 1px solid #dadada;
    width: 50%;
  }
`;

const Icon = styled.div`
  width: 50px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  input[type="radio"] {
    width: inherit;
    margin-right: 20px;
  }

  .icon {
    width: 50px;
    font-size: 24px;
  }

  .input,
  select,
  .input-search {
    width: 60% !important;
  }
`;

export { BoxDate, InputGroup, InputMinute, Icon };
