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
      width: 6.5rem;
      height: 3.25rem;
      font-size: 1.4rem;
    `}
  ${(props) =>
    props.wh === "m" &&
    css`
      width: 7.5rem;
      height: 3.5rem;
      font-size: 1.4rem;
    `}
    ${(props) =>
    props.wh === "l" &&
    css`
      width: 9rem;
      height: 4rem;
      font-size: 1.4rem;
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
