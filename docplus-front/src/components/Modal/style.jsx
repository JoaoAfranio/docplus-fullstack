import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const ModalOpacity = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  width: 700px;
  padding: 50px;

  background-color: #ffffff;
  border-radius: 10px;
`;

const Header = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  input,
  select {
    padding: 5px;
    font-size: 16px;
    width: 30%;
    padding-left: 10px;
    border: 2px solid #dadada;
  }
`;

const Footer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 30px;

  button {
    padding: 15px 10px;

    cursor: pointer;

    text-transform: uppercase;
    text-align: center;
    font-weight: bold;
    color: #ffffff;

    border: none;
    border-radius: 18px;

    &:active {
      transform: scale(0.98);
    }

    &.close {
      background-color: ${COLORS.DARKER_BLUE};
      border-bottom: 5px solid #3f22ec;
    }

    &.delete {
      background-color: ${COLORS.RED};
      border-bottom: 5px solid #912805;
    }

    &.save {
      background-color: ${COLORS.GREEN};
      border-bottom: 5px solid #40890a;
    }
  }
`;

export { ModalOpacity, Modal, Header, Content, Footer };
