import React from "react";
import styled, { css } from "styled-components";
import { boxBorderRadius } from "../utils/styles/mixins";

const CustomButton = styled.button`
  cursor: pointer;
  width: 8rem;
  background-color: ${(props) => props.theme.primary};
  border: none;
  ${boxBorderRadius}
  color : #d1d6e6;
  font-weight: 500;
  ${(props) =>
    props.wh === "s" &&
    css`
      width: 6rem;
      height: 3rem;
      font-size: 1.4rem;
    `}
  ${(props) =>
    props.wh === "m" &&
    css`
      width: 7rem;
      height: 3rem;
      font-size: 1.4rem;
    `}
    ${(props) =>
    props.wh === "l" &&
    css`
      width: 10rem;
      height: 4.5rem;
    `}
    ${boxBorderRadius}
`;

const Button = ({ children, ...props }) => {
  return (
    <CustomButton wh={props.wh} onClick={props.onClick}>
      {children}
    </CustomButton>
  );
};

Button.defaultProps = {
  wh: "m",
  onClick: () => {},
};

export default Button;
