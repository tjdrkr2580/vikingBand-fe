import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const fontBigger = css`
  font-size: 3.5rem;
  font-weight: 500;
`;

export const fontBig = css`
  font-size: 2.4rem;
  font-weight: 500;
`;

export const fontMedium = css`
  font-size: 2rem;
  font-weight: 500;
`;

export const fontSmall = css`
  font-size: 1.7rem;
  font-weight: 300;
`;

export const fontSmaller = css`
  font-size: 1.4rem;
  font-weight: 300;
`;

export const boxBorderRadius = css`
  border-radius: 0.8rem;
`;

export const circleBorderRadius = css`
  border-radius: 50%;
`;

export const pageMargin = css`
  margin-top: 11rem;
`;

export const elipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const modalWrapperStyle = css`
  z-index: 999;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  ${flexCenter}
`;

export const modalStyle = css`
  width: 35rem;
  height: 42.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  ${boxBorderRadius}
  input {
    display: flex;
    width: 20rem;
    background-color: transparent;
    height: 4rem;
    color: ${(props) => props.theme.textColor3};
    letter-spacing: 0.08rem;
    font-size: 1.35rem;
    padding: 0.4rem 0.8rem;
    border: 0.1rem solid #797777;
    border-radius: 0.8rem;

    &:focus {
      outline: none;
    }
  }
  h1 {
    margin-left: 3rem;
    font-size: 2.2rem;
    align-self: flex-start;
    margin-bottom: 1rem;
  }
  p {
    font-weight: 500;
    padding-left: 3.5rem;
    font-size: 1.075rem;
  }
  span {
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    cursor: pointer;
    font-size: 1.075rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const errorStyle = css`
  width: 25rem;
  font-size: 1.15rem;
  padding-right: 5rem;
  margin: -0.5rem 0;
  color: ${(props) => props.theme.primary};
`;

export const studyLists = css`
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

export const studyList = css`
  cursor: pointer;
  width: 25rem;
  height: 30rem;
  padding: 0.6rem;
  img {
    width: 100%;
    height: 45%;
    ${boxBorderRadius}
    object-fit: cover;
  }
  ${boxBorderRadius}
  transition: 0.25s transform;
  &:hover {
    transform: scale(0.98);
  }
  box-shadow: ${(props) => props.theme.shadow};
`;

export const studyLayout = css`
  padding: 0.6rem;
  .title {
    ${fontMedium}
  }
  .subject {
    color: #d1d6e6;
    width: fit-content;
    padding: 0.4rem 0.6rem;
    background-color: ${(props) => props.theme.primary};
    ${boxBorderRadius};
    font-size: 1.05rem;
  }
  .desc {
    font-size: 1.05rem;
    width: 100%;
    ${elipsis}
  }
  .date {
    font-size: 1.1rem;
    font-weight: 500;
  }
  .post-bottom {
    z-index: 997;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    .author {
      font-size: 1.2rem;
      display: flex;
      font-weight: 500;
      justify-content: flex-end;
    }
    .heart {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      span {
        ${fontSmaller}
      }
    }
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const text = css`
  ${fontBig}
  color : ${(props) => props.theme.textColor1}
`;
