import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 80%;

  @media (max-width: 1000px) {
    width: 100%;
  }
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
  border: 2px solid ${COLORS.GREY};
  border-radius: 10px;

  gap: 10px;

  padding: 10px;
  height: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media (max-width: 1000px) {
    gap: 10px;
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${COLORS.GREY};
  border-radius: 10px;
  font-size: 24px;

  padding: 10px 20px;

  color: ${COLORS.MEDIUM_GREY};

  p {
    font-size: 10px;
    margin-bottom: 5px;

    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5px;

    &.data {
      font-size: 18px;
    }
  }
`;

const BoxGraph = styled.div`
  display: flex;
  width: 100%;
`;

export { Container, Content, Title, Box, Info, BoxGraph };
