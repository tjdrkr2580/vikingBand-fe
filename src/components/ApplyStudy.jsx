import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import {
  flexCenter,
  fontBig,
  studyLayout,
  studyList,
  studyLists,
} from "../utils/styles/mixins";
import test from "../assets/test.jpg";

const ApplyStudies = styled.ul`
  ${studyLists}
`;

const ApplyStudylist = styled.li`
  ${studyList}
`;

const PostForm = styled.section`
  ${studyLayout}
`;

const Text = styled.h1`
  ${fontBig}
  margin: 0 auto;
`;

const ApplyStudy = ({ data }) => {
  return (
    <>
      {data.length === 0 && <Text>좋아요 한 스터디가 존재하지 않습니다!</Text>}

      <ApplyStudies>
        {data.length !== 0 &&
          data.map((data) => (
            <ApplyStudylist key={data.studyId}>
              <img
                src={data.imageUrl === "" ? test : data.imageUrl}
                alt={data.title}
              />
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
            </ApplyStudylist>
          ))}
      </ApplyStudies>
    </>
  );
};

export default ApplyStudy;
