import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { pageMargin } from "../utils/styles/mixins";
import {
  boxBorderRadius,
  fontMedium,
  flexCenter,
  elipsis,
} from "../utils/styles/mixins";
import study from "../assets/study.jpg";
import { useQuery } from "react-query";
import { getStudies, getUserDetailInfo } from "../utils/axios/axios";
import unnamed from "../assets/unname.png";
import { circleBorderRadius } from "../utils/styles/mixins";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../utils/recoil/atoms";

// 전체 페이지 감싸기
const ListWrapper = styled.section`
  min-height: 77.5vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  ${pageMargin}
`;

//네비게이션 상단 프로필사진 + 유저 ID
const ProfileWrapper = styled.div`
  margin: 0 auto;
  text-align: center;
  justify-content: space-around;
  gap: 1.5rem;
  align-items: center;
  font-size: 5rem;
  display: flex;
`;

const ProfileIcon = styled.img`
  cursor: pointer;
  width: 6rem;
  height: 6rem;
  ${circleBorderRadius}
  object-fit: cover;
`;

// 네비게이션 스타일링
const Navigation = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 10px;
  gap: 20px;
  .sectionText {
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0 1rem;
    cursor: pointer;
    color: #555;
    &.selected {
      color: red;
    }
  }
`;

//스터디 모음 틀 스타일링
const PostLists = styled.ul`
  display: grid;
  max-width: 90rem;
  grid-template-columns: 1fr 1fr 1fr;
  place-items: center;
  margin: 0 auto;
  gap: 1.25rem;
`;

// 각 스터디 틀 스타일링
const PostList = styled.li`
  border: 1px solid black;
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

// 스터디 내부 스타일링
const PostForm = styled.section`
  border: 2px solid ${(props) => props.theme.primary};
  border-radius: 5px;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  height: 55%;
  .title {
    ${fontMedium};
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
  .subject {
    color: ${(props) => props.theme.bgColor};
    padding: 0.4rem 0.6rem;
    background-color: ${(props) => props.theme.primary};
    ${flexCenter};
    ${boxBorderRadius};
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .desc {
    font-size: 1.05rem;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1rem;
    ${elipsis}
  }
  .date {
    font-size: 1.1rem;
    font-weight: 500;
    font-size: 0.5rem;
    text-align: center;
  }
  .author {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    display: flex;
    font-weight: 500;
    justify-content: flex-end;
  }
`;

// 네비게이션 동작원리
const NavBar = ({ selectedPage, setSelectedPage }) => {
  const sections = ["찜한 스터디", "신청한 스터디", "내 스터디 관리"];

  return (
    <Navigation>
      {sections.map((section) =>
        section === selectedPage ? (
          <div key={section}>
            <span className="sectionText selected">{section}</span>
          </div>
        ) : (
          <div onClick={() => setSelectedPage(section)} key={section}>
            <span className="sectionText">{section}</span>
          </div>
        )
      )}
    </Navigation>
  );
};

// 좋아요 한 페이지
const FavoriteStudy = () => {
  const posts = [
    {
      id: 2,
      userId: 2,
      author: "teste2r",
      title: "영어공부",
      subject: "주제2",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
  ];

  return (
    <ListWrapper>
      <PostLists>
        {posts.map((post, i) => (
          <PostList key={i}>
            <img src={study} alt={post.title} />
            <PostForm>
              <h1 className="title">{post.title}</h1>
              <span className="subject">{post.subject}</span>
              <p className="desc">스터디 소개 문구</p>
              <p className="date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <span className="author">작성자 : {post.author}</span>
            </PostForm>
          </PostList>
        ))}
      </PostLists>
    </ListWrapper>
  );
};

// 신청한 스터디
const AppliedStudy = () => {
  const posts = [
    {
      id: 2,
      userId: 2,
      author: "teste2r",
      title: "리액트공부",
      subject: "리액트쿼리",
      imageUrl: null,
      createdAt: "2023-02-24T04:02:51.191694",
      modifiedAt: "2023-02-24T04:02:51.191694",
    },
  ];

  return (
    <ListWrapper>
      <PostLists>
        {posts.map((post, i) => (
          <PostList key={i}>
            <img src={study} alt={post.title} />
            <PostForm>
              <h1 className="title">{post.title}</h1>
              <span className="subject">{post.subject}</span>
              <p className="desc">스터디 소개 문구</p>
              <p className="date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
              <span className="author">작성자 : {post.author}</span>
            </PostForm>
          </PostList>
        ))}
      </PostLists>
    </ListWrapper>
  );
};

// 내 스터디 관리
const ManagedStudy = () => {
  //유저정보 가져오기
  const userInfo = useRecoilValue(userInfoState);

  //스터디 정보 갖고오기
  const { data } = useQuery("studies", getStudies);
  const membersInfo = data.data.data;

  //스터디에 적힌 작성자 memberName과 유저의 memberName 비교
  const posts = membersInfo.filter(
    (info) => info.author.memberName === userInfo.memberName
  );

  return (
    <ListWrapper>
      <PostLists>
        {posts.map((post, i) => (
          <PostList key={i}>
            <img src={study} alt={post.title} />
            <PostForm>
              <h1 className="title">{post.title}</h1>
              <span className="subject">{post.subject}</span>
              <p className="desc">스터디 소개 문구</p>
              <p className="date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </PostForm>
          </PostList>
        ))}
      </PostLists>
    </ListWrapper>
  );
};

// 조건부 렌더링
const Profile = () => {
  const userInfo = useRecoilValue(userInfoState);
  const [selectedPage, setSelectedPage] = useState("찜한 스터디");
  const { isLoading, data } = useQuery("detailInfo", () =>
    getUserDetailInfo(userInfo.id)
  );
  if (isLoading === false) {
    console.log(data);
  }
  return (
    <>
      <ListWrapper>
        <ProfileWrapper>
          <ProfileIcon src={unnamed} /> {userInfo.memberName}
        </ProfileWrapper>
        {isLoading === false && (
          <>
            <NavBar
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            />
            {selectedPage === "찜한 스터디" && <FavoriteStudy props={data} />}
            {selectedPage === "신청한 스터디" && <AppliedStudy props={data} />}
            {selectedPage === "내 스터디 관리" && <ManagedStudy props={data} />}
          </>
        )}
      </ListWrapper>
    </>
  );
};

export default Profile;
