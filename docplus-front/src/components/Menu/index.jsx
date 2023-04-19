import { Container, Item, Title } from "./style";
import Home from "../../assets/icons/home.png";
import Schedule from "../../assets/icons/schedule.png";
import User from "../../assets/icons/user.png";
import Patient from "../../assets/icons/patient.png";

export default function Menu() {
  return (
    <Container>
      <Title>docplus</Title>
      <Title className="mobile">D+</Title>
      <Item to="/dashboard/home">
        <img src={Home} alt="home" /> <p>Home</p>
      </Item>

      <Item to="/dashboard/schedule">
        <img src={Schedule} alt="schedule" /> <p>Agenda</p>
      </Item>

      <Item to="/dashboard/patient">
        <img src={Patient} alt="patient" /> <p>Pacientes</p>
      </Item>

      <Item to="/dashboard/profile">
        <img src={User} alt="profile" />
        <p>Perfil</p>
      </Item>
    </Container>
  );
}
