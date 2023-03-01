import React from "react";
import styled from "styled-components";
import { circleBorderRadius } from "../utils/styles/mixins";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { useRecoilState } from "recoil";
import { darkmodeState } from "../utils/recoil/atoms";

const ToggleModeButton = styled.button`
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  ${circleBorderRadius}
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  svg {
    color: ${(props) => props.theme.textColor3};
  }
`;

const ToggleMode = () => {
  const [isDark, setIsDark] = useRecoilState(darkmodeState);
  const onToggleDarkmode = () => {
    setIsDark(!isDark);
  };
  return (
    <ToggleModeButton onClick={() => onToggleDarkmode()}>
      {isDark === true ? (
        <BsFillMoonFill size={20} />
      ) : (
        <BsFillSunFill size={20} />
      )}
    </ToggleModeButton>
  );
};

export default ToggleMode;
