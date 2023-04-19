import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 40%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Title = styled.h1`
  display: flex;
  font-size: 24px;
  font-weight: bold;
  gap: 10px;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid ${COLORS.GREY};
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding-top: 10px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 2px solid ${COLORS.GREY};
  padding: 10px 0px;
  cursor: pointer;

  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 1px;
  color: ${COLORS.MEDIUM_GREY};

  &.active {
    border-color: ${COLORS.DARK_BLUE};
    color: ${COLORS.DARK_BLUE};
  }
`;

export { Container, Content, Title, Header, Subtitle };
