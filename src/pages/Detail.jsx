import React from "react";
import styled from "styled-components";
import study from "../assets/study.jpg";
import { useNavigate, useParams } from "react-router-dom";
import {
  fontBigger,
  fontBig,
  pageMargin,
  fontMedium,
  fontSmall,
  fontSmaller,
} from "../utils/styles/mixins";
import { flexCenter, boxBorderRadius } from "../utils/styles/mixins";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { css } from "styled-components";
import { useQuery } from "react-query";
import { getStudy } from "../utils/axios/axios";

const DetailWrapper = styled.div`
  min-width: 100vw;
  ${flexCenter}
  flex-direction: column;
  ${pageMargin}
`;

const ImgWrapper = styled.section`
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

const ContentWrapper = styled.section`
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

const SubTitles = styled.ul`
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

const IconsLayout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: white;
  span {
    ${fontSmaller}
    padding-bottom: 0.2rem;
  }
`;

const OneLineDesc = styled.section`
  height: 20rem;
  ${flexCenter}
  ${fontSmall}
`;

const Detail = () => {
  //스터디 찜하기
  const [liked, setLiked] = useState(false);
  const handleLikeClick = () => {
    setLiked(!liked);
    if (!liked) {
      alert("찜한 스터디에 추가되었습니다.");
    } else {
      alert("찜한 스터디에서 삭제되었습니다.");
    }
  };
  // 가입신청
  const [registered, setRegistered] = useState(false);
  const handleRegisterButton = (studyId) => {
    setRegistered(!registered);
    if (!registered) {
      alert("가입 신청 완료!");
    } else {
      alert("가입 신청 취소 완료!");
    }
  };
  // 이전으로
  const navigate = useNavigate();
  const backToHomeHandler = () => {
    navigate("/");
  };
  // const { data } = useQuery("studies", getStudies);
  // const posts = data.data.data;
  // const post = posts.find((post) => post.studyId === parseInt(id));
  const { id } = useParams();

  const { isLoading, data } = useQuery("study", () => getStudy(id));
  if (isLoading === false) console.log(data.data);
  return (
    <DetailWrapper>
      {isLoading === false && data !== undefined && (
        <>
          <ImgWrapper>
            <img src={study} alt="study" />
            <ContentWrapper>
              <h1>{data.data.title}</h1>
              <SubTitles>
                <li>{data.data.author.memberName}</li>
                <li>{new Date(data.data.createdAt).toLocaleString()}</li>
              </SubTitles>
              <IconsLayout>
                <FaHeart color="FF597B" size="18" />
                <span>{data.data.likes}</span>
              </IconsLayout>
            </ContentWrapper>
          </ImgWrapper>
          <OneLineDesc>{data.data.content}</OneLineDesc>
        </>
      )}
    </DetailWrapper>
  );
};
export default Detail;
