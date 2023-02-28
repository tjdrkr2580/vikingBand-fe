import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fontSmall, pageMargin } from "../utils/styles/mixins";
import { userInfoState } from "../utils/recoil/atoms";
import { useNavigate } from "react-router-dom";
import { getUserDetailInfo } from "../utils/axios/axios";
import ApplyStudy from "../components/ApplyStudy";
import LikeStudy from "../components/LikeStudy";
import MyStudy from "../components/MyStudy";

const ProfileWrapper = styled.section`
  ${pageMargin}
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const NavBarWrapper = styled.ul`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;

const NavBarList = styled.li`
  ${fontSmall}
`;

const Profile = () => {
  const userInfo = useRecoilValue(userInfoState);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("좋아요 한 스터디");
  useEffect(() => {
    if (userInfo === undefined) {
      navigate("/");
    }
  }, []);

  const onFilter = (e) => {
    setFilter(e.target.innerText);
  };
  const res = useQuery("detailInfo", () => {
    return getUserDetailInfo(userInfo.memberId);
  });
  if (res.isLoading === false) {
    console.log(res);
  }
  return (
    <ProfileWrapper>
      {res.isSuccess === true && (
        <>
          <NavBarWrapper>
            <NavBarList
              className={filter === "좋아요 한 스터디" && "active"}
              onClick={onFilter}
            >
              좋아요 한 스터디
            </NavBarList>
            <NavBarList
              className={filter === "가입 신청한 스터디" && "active"}
              onClick={onFilter}
            >
              가입 신청한 스터디
            </NavBarList>
            <NavBarList
              className={filter === "내 스터디 관리" && "active"}
              onClick={onFilter}
            >
              내 스터디 관리
            </NavBarList>
          </NavBarWrapper>
          {filter === "좋아요 한 스터디" && (
            <LikeStudy data={res?.data?.myStudyWishes} />
          )}
          {filter === "가입 신청한 스터디" && (
            <ApplyStudy data={res?.data?.myStudyRegists} />
          )}
          {filter === "내 스터디 관리" && (
            <MyStudy data={res?.data?.myCreatedStudies} />
          )}
        </>
      )}
    </ProfileWrapper>
  );
};

export default Profile;
