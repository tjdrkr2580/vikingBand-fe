import styled from "styled-components";
import ToggleMode from "../element/ToggleMode";

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 4rem;
  padding: 1rem 0.7rem;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <ToggleMode />
    </HeaderWrapper>
  );
};

export default Header;
