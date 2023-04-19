import styled from "styled-components";
import Menu from "../components/Menu";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <Container>
      <Menu />
      <Outlet />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 30px;

  margin-left: 256px;

  @media (max-width: 1000px) {
    margin-left: 80px;
  }
`;
