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
  margin-top: 9rem;
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
  position: absolute;
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
