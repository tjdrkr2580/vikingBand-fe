import React from "react";
import styled from "styled-components";
import study from "../assets/study.jpg";
import { useParams } from "react-router-dom";
import {
  fontMedium,
  flexCenter,
  boxBorderRadius,
  elipsis,
} from "../utils/styles/mixins";

<<<<<<< HEAD

=======
>>>>>>> 2c6a1d2 (fix | parsing eslint)
// 전체 감싸기
const DetailWrapper = styled.section`
  min-height: 77.5vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 30px auto;
  align-items: center;
  text-align: center;
`;

// img 위 작성자 id
const CreatorBox = styled.div`
  text-align: right;
  margin-right: 100rem;
  width: 100%;
  margin-bottom: 0.2rem;
`;
// img
const Image = styled.img`
  max-width: 35%;
  max-height: 25%;
  border-radius: 5px;
`;

//제목 , 주제, 날짜, 상세설명 순으로 스타일 적용.
const DetailForm = styled.div`
  padding: 0.6rem;
  .title {
    ${fontMedium}
  }
  .subject {
    color: #d1d6e6;
    max-width: 5rem;
    padding: 0.4rem 0.6rem;
    background-color: ${(props) => props.theme.primary};
    ${flexCenter};
    ${boxBorderRadius};
    font-size: 1.1rem;
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
  .author {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    display: flex;
    font-weight: 500;
    justify-content: flex-end;
  }
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Detail = () => {
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
  const post = posts.find((post) => post.id === parseInt(id));
  return (
    <DetailWrapper>
      <CreatorBox>Created by {post.author}</CreatorBox>
      <Image src={study} />
      <DetailForm>
        <h1 className="title">{post.title}</h1>
        <span className="subject">{post.subject}</span>
        <p className="date">{new Date(post.createdAt).toLocaleString()}</p>
        <p className="desc">
          저희는 무슨무슨 스터디입니다, 저희는 어디어디에서 만날 것 입니다.
        </p>
      </DetailForm>
    </DetailWrapper>
  );
};

export default Detail;
