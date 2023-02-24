import React from "react";
import styled from "styled-components";

const CustomButton = styled.button``;

const Button = ({ children, ...props }) => {
  return <CustomButton wh={props.wh}>{children}</CustomButton>;
};

export default Button;
