import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import { fontBig, fontMedium } from "../utils/styles/mixins";

const MyStudyLists = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyStudyList = styled.li`
  width: 50vw;
  min-width: 28rem;
  max-width: 70rem;
  height: 4.5rem;
  padding: 1rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-around;

  h1 {
    ${fontMedium}
  }
`;

const Like = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Text = styled.h1`
  ${fontBig}
`;

const MyStudy = ({ data }) => {
  console.log(data);
  return (
    <MyStudyLists>
      {data.length === 0 && <Text>생성하신 스터디가 존재하지 않습니다.</Text>}
      {data.length !== 0 &&
        data.map((data) => (
          <MyStudyList key={data.studyId}>
            <h1>{data.title}</h1>
            <Like>
              <AiFillHeart size={20} color="EB455F" />
              <span>{data.likes}</span>
            </Like>
          </MyStudyList>
        ))}
    </MyStudyLists>
  );
};

export default MyStudy;
