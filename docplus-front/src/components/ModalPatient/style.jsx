import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Icon = styled.div`
  width: 50px;
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  input[type="checkbox"] {
    width: inherit;
    margin-right: 20px;
  }

  .icon {
    width: 50px;
    font-size: 24px;
  }

  .input {
    width: 60%;
  }
`;

export { InputGroup, Icon };
