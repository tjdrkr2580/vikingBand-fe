import React from "react";
import styled from "styled-components";

const ApplyWrapper = styled.section`
  display: flex;
`;

const ApplyStudy = ({ data }) => {
  console.log(data);
  return <ApplyWrapper>가입</ApplyWrapper>;
};

export default ApplyStudy;
