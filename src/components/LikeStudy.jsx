import React from "react";
import styled from "styled-components";

const LikeStudies = styled.ul`
  display: grid;
  max-width: 90rem;
  grid-template-columns: 1fr 1fr 1fr;
  @media (max-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 580px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  place-items: center;
  margin: 0 auto;
  gap: 1.25rem;
`;

const LikeStudy = ({ data }) => {
  console.log(data);
  return <LikeStudies>헬로</LikeStudies>;
};

export default LikeStudy;
