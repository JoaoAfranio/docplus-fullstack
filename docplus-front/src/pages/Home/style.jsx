import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  padding: 100px 40px;
  height: 100%;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export { Container, Row };
