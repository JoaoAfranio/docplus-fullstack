import styled from "styled-components";
import { COLORS } from "../../assets/css/Colors";

export default function Info({ setElementActive, icon, description, data, isActive }) {
  return (
    <Container
      onClick={(e) => {
        setElementActive(e);
      }}
      isActive={isActive}
      description={description}
    >
      {icon}
      <span>
        <p>{description}</p> <p className="data">{data}</p>
      </span>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  border: 2px solid ${COLORS.GREY};
  border-radius: 10px;
  font-size: 24px;

  cursor: pointer;

  padding: 10px;

  color: ${(props) => (props.isActive ? "#ffffff" : COLORS.MEDIUM_GREY)};
  background-color: ${(props) => (props.isActive ? COLORS.GREEN : "none")};
  border-color: ${(props) => (props.isActive ? COLORS.GREEN : "none")};
  border: ${(props) => (props.description === "Total" || props.description === "Realizadas" ? `2px dotted #d1caca` : "")};
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
