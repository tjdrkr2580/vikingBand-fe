import React from "react";
import styled from "styled-components";
import { pageMargin } from "../utils/styles/mixins";
import { fontSmall } from "../utils/styles/mixins";

const HomeWrapper = styled.section`
  min-height: 77.5vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${pageMargin};
`;

const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 0 auto;
`;

const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.primary};
  ${fontSmall};
`;

const LikedStudyWrapper = styled(SectionWrapper)`
  background-color: #e3f2fd;
`;

const AppliedStudyWrapper = styled(SectionWrapper)`
  background-color: #f8bbd0;
`;

const CreatedStudyWrapper = styled(SectionWrapper)`
  background-color: #c8e6c9;
`;

const Profile = () => {
  return (
    <>
      <HomeWrapper>
        <LikedStudyWrapper>
        <TextWrapper>이 스터디가 좋아요!</TextWrapper>
        
        </LikedStudyWrapper>
        
        <AppliedStudyWrapper>
        <TextWrapper>가입 신청한 스터디</TextWrapper>
        </AppliedStudyWrapper>
        
        <CreatedStudyWrapper>
        <TextWrapper>내 스터디 관리</TextWrapper>
        </CreatedStudyWrapper>
      </HomeWrapper>
    </>
  );
};

export default Profile;
