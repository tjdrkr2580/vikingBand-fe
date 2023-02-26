import React from "react";
import styled from "styled-components";
import { fontSmaller } from "../utils/styles/mixins";

const StyledFooter = styled.footer`
  position: relative;
  margin-top: 3rem;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor3};
  text-align: center;

  ${fontSmaller}
  width: 100vw;
  font-weight: 500;
  height: 3rem;
`;

const Footer = () => {
  return (
    <StyledFooter>© 2023. Viking Band Co. all rights reserved.</StyledFooter>
  );
};

export default Footer;
