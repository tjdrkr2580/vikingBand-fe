import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import {
  fontBig,
  studyLayout,
  studyList,
  studyLists,
} from "../utils/styles/mixins";
import test from "../assets/test.jpg";

const LikeStudies = styled.ul`
  ${studyLists}
`;

const LikeStudylist = styled.li`
  ${studyList}
`;

const PostForm = styled.section`
  ${studyLayout}
`;

const Text = styled.h1`
  ${fontBig}
`;

const LikeStudy = ({ data }) => {
  return (
    <>
      {data.length === 0 && <Text>좋아요 한 스터디가 존재하지 않습니다!</Text>}
      <LikeStudies>
        {data.length !== 0 &&
          data.map((data) => (
            <LikeStudylist key={data.studyId}>
              <img src={test} alt={data.title} />
              <PostForm>
                <h1 className="title">{data.title}</h1>
                <span className="subject">{data.subject}</span>
                <p className="desc">{data.content}</p>
                <p className="date">
                  {new Date(data.createdAt).toLocaleString()}
                </p>
                <section className="post-bottom">
                  <div className="heart">
                    <AiFillHeart size={22} color="FF597B" />
                    <span>{data.likes}</span>
                  </div>
                  <span className="author">
                    작성자 : {data.author.memberName}
                  </span>
                </section>
              </PostForm>
            </LikeStudylist>
          ))}
      </LikeStudies>
    </>
  );
};

export default LikeStudy;
