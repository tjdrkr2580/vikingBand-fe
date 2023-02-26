import React from "react";
import styled from "styled-components";
import study from "../assets/study.jpg";
import { useParams } from "react-router-dom";
import { fontBigger, fontBig } from "../utils/styles/mixins";
import { flexCenter, boxBorderRadius } from "../utils/styles/mixins";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { css } from "styled-components";


// 전체 감싸기
const DetailWrapper = styled.div`
  min-height: 77.5vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  align-items: center;
  text-align: center;
  overflow: auto;
`

// img 위 작성자 id
const CreatorBox = styled.div`
  text-align: center;
  width: 100%;
  margin-bottom: 0.2rem;
`
// img
const Image = styled.img`
  max-width: 35%;
  max-height: 25%;
  border-radius: 5px;
`

const elipsis = css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

//작성인, 아이콘, 제목, 주제,날짜, 상세설명 순으로 스타일 적용. 
const DetailForm = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  .author {
    font-size: 0.5rem;
    margin-bottom: 2rem;
  }
  .Icon {
    color: #d1d6e6;
    width: 9rem;
    height: 3.5rem;
    padding: 0.4rem 0.6rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: ${(props) => props.theme.primary};
    ${flexCenter};
    ${boxBorderRadius};
    font-size: 1.4rem; 
  }
  .title {
    ${fontBigger}
    margin-bottom: 1rem;
  }
  .subject {
    ${fontBig}
    margin-bottom: 1rem;
  }
  .date {
    font-size: 0.5rem;
    margin-bottom: 1rem;
  }
  .desc {
    max-width: 35%;
    margin: 0 auto;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    ${elipsis}
  }
  .LikeButton {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    padding: 0;
    color: ${props => props.theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 auto;
  .Button {
    color: ${(props) => props.theme.primary};
    max-width: 10rem;
    padding: 0.4rem 0.6rem;
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.primary};
    ${flexCenter};
    ${boxBorderRadius};
    font-size: 1.1rem; 
  }
`


const Detail = () => {

const [liked, setLiked] = useState(false);
const handleLikeClick = () => {
  setLiked(!liked);
};

  const posts = [
    {
      id: 22311,
      userId: 2,
      author: "vccvb123",
      title: "리액트 공부해요!",
      subject: "Front-End",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
    {
      id: 2435,
      userId: 2,
      author: "bvcvcsd123",
      title: "모각코",
      subject: "Back-End",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
  ];

  const { id } = useParams();
  const post = posts.find(post => post.id === parseInt(id));

  return (
    <DetailWrapper>
      
      <Image src={study} />
      <CreatorBox></CreatorBox>
      <DetailForm>
              <p className="author">Created by {post.author} at {new Date(post.createdAt).toLocaleString()} </p>
              <span className="Icon">스터디명</span>
              <h1 className="title">{post.title}</h1>
              <span className="Icon">카테고리</span>
              <span className="subject">{post.subject}</span>
              <span className="Icon">스터디 소개</span>
              <p className="desc">
                같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요!     
                같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요! 같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요!
                같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요! 같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요!       
                같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요! 같이 리액트 공부하실 분을 모집합니다.
                알고리즘도 같이 공부해요!                   
              </p>
              <ButtonWrapper>
              <button className="LikeButton" onClick={handleLikeClick} aria-label="Like button">
              <FaHeart size={28} fill={liked ? "red" : "none"} />
              </button>
              <button className="Button">가입 신청하기</button>
              <button className="Button">이전으로</button>
              </ButtonWrapper>
      </DetailForm>
      </DetailWrapper>
  );
};

export default Detail;
