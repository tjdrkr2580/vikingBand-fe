import { pageMargin, flexCenter, boxBorderRadius, fontSmall, fontSmaller } from "../utils/styles/mixins";
import styled from "styled-components";

export const DetailWrapper = styled.div`
  min-width: 100vw;
  ${flexCenter}
  flex-direction: column;
  ${pageMargin}
`;

export const ImgWrapper = styled.section`
  width: 97.5%;
  position: relative;
  height: 25rem;
  img {
    ${boxBorderRadius}
    width: 100%;
    height: 100%;
    filter: brightness(55%);
    vertical-align: middle;
    object-fit: cover;
  }
`;

export const ContentWrapper = styled.section`
  z-index: 997;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${flexCenter}
  flex-direction: column;
  gap: 1rem;
  h1 {
    color: white;
    font-size: 2.8rem;
  }
  p {
    color: white;
    ${fontSmall}
  }
`;
export const SubTitles = styled.ul`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-direction: column;
  li {
    color: white;
    width: fit-content;
    ${fontSmaller}
  }
`;
export const IconsLayout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: white;
  span {
    ${fontSmaller}
    padding-bottom: 0.2rem;
  }
`;
export const OneLineDesc = styled.section`
  height: 20rem;
  ${flexCenter}
  ${fontSmall}
`;