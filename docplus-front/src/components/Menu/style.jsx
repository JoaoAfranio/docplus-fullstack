import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../../assets/css/Colors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 256px;
  height: 100vh;
  border-right: 2px solid #e5e5e5;
  padding: 20px;

  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 1000px) {
    width: 100px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 30px 10px;
  color: ${COLORS.GREEN};
  letter-spacing: 1px;

  &.mobile {
    display: none;
  }

  @media (max-width: 1000px) {
    display: none;

    &.mobile {
      display: inherit;
    }
  }
`;

const Item = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 15px;
  margin-bottom: 15px;

  text-transform: uppercase;
  letter-spacing: 1px;
  color: ${COLORS.MEDIUM_GREY};
  font-weight: bold;
  text-decoration: none;
  font-size: 14px;

  border-radius: 15px;

  &.active {
    border: 2px solid ${COLORS.BLUE};
    color: ${COLORS.MEDIUM_BLUE};
    background-color: ${COLORS.LIGHT_BLUE} !important;
  }

  &:hover {
    background-color: ${COLORS.LIGHT_GREY};
  }

  img {
    width: 30px;
  }

  @media (max-width: 1000px) {
    justify-content: center;
    p {
      display: none;
    }
  }
`;

export { Container, Title, Item };
