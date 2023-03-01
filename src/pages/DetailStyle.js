import { 
  pageMargin, 
  flexCenter, 
  boxBorderRadius, 
  fontSmall, 
  fontSmaller, 
  fontBigger, 
  fontBig,
} from "../utils/styles/mixins";
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
  height: ${(props) => props.height || '10rem'};
  ${flexCenter}
  ${fontSmall}
`;

export const StStudyMember = styled.div`
  margin-left: 1rem;
  margin-right: 0.5rem;
  ${fontSmall}
  font-weight: bold;
`
export const StCommentText = styled.div`
  ${fontBigger}
  padding: 3rem;
`

export const StComment = styled.div`
display: block;
`

export const StInput = styled.input`
  border-radius: 0.5rem;
  width: 60rem;
  height: ${(props) => props.height || '6rem'};
  font-size: 1.6rem;
  text-indent: 1rem;
  margin-bottom: 2rem;
  

  ::placeholder {
    font-size: 1.6rem;
    text-indent: 1rem;
  }
`

export const BoardBox = styled.div`
width: 60rem;
min-height: 15rem;
margin-bottom: 5rem;
border: 1px solid ${(props) => props.theme.primary};
padding: 1rem;
${boxBorderRadius}
.memberName { 
  text-align: right;
  margin-bottom: 0.1rem;
}
.createdAt {
  text-align: right;
  margin-bottom: 2rem;
}
.boardTitle {
  margin-bottom: 1rem;
  ${fontBig};
  margin-bottom: 2rem;
}
.boardContent {
  ${fontSmaller}
  margin-bottom: 2rem;
}
input {
  margin-bottom: 2rem;
}
`
export const CommentInput = styled.input`
${boxBorderRadius}
width: 45rem;
height: 4rem;
margin-right: 1.5rem;
`
