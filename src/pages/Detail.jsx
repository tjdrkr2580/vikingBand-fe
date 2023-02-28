import React from "react";
import study from "../assets/study.jpg";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteStudyRegist, getStudy, postStudyRegist, postStudyWish } from "../utils/axios/axios";
import Button from "../element/Button";
import {
  DetailWrapper,
  ImgWrapper,
  ContentWrapper,
  SubTitles,
  IconsLayout,
  OneLineDesc,
  StStudyMember,
  StCommentText,
  StInput
} from "./DetailStyle";

const Detail = () => {
  
  const { id } = useParams();
  
  const queryClient = useQueryClient();
  
  // 찜하기 
  const wishMutate = useMutation((id) => postStudyWish(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });
  
  const onWish = async (id) => {
    await wishMutate.mutateAsync(id);
  };

  const { isLoading, data } = useQuery("study", () => getStudy(id));
  if (isLoading === false) console.log(data.data)
  const likedStatus = data?.data.wished;
  const appliedStatus = data?.data.applied;
  const approvedStatus = data?.data.approved;
  const appliedMembers = data?.data.appliedMembers
  const approvedMembers = appliedMembers?.filter((member) => member.approved === true)
  
  // 가입신청 
  const registerMutate = useMutation((id) => postStudyRegist(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study")
    }
  });
  const onRegister = async (id) => {
    await registerMutate.mutateAsync(id);
  };

  // 가입신청 취소 
  const cancelRegisterMutate = useMutation((id) => deleteStudyRegist(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study")
    }
  });
  const onCancelRegister = async (id) => {
    await cancelRegisterMutate.mutateAsync(id);
  };
  
  
  return (
    <DetailWrapper>
      {/* 가입신청 승인 전 */}
      {isLoading === false && data !== undefined && approvedStatus === false && (
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
                <FaHeart
                  color={likedStatus ? "red" : "lightgray"}
                  cursor="pointer"
                  size="24"
                  onClick={() => onWish(data.data.studyId)}
                />
                <span>{data.data.likes}</span>
              </IconsLayout>
            </ContentWrapper>
          </ImgWrapper>
          <OneLineDesc>{data.data.content}</OneLineDesc>
          <Button wh="l" 
          onClick={!appliedStatus ? 
          () => onRegister(data.data.studyId) : 
          () => onCancelRegister(data.data.studyId)}>
            {!appliedStatus ? "가입 신청" : "가입 신청 취소"}
          </Button>
        </>
      )}

      {isLoading === false && data !== undefined && approvedStatus === true && (
    
      <>
      <ImgWrapper>
            <img src={study} alt="study" />
            <ContentWrapper>
              <h1>{data.data.title}</h1>
              <SubTitles>
                <li>스터디 리더 : {data.data.author.memberName}</li>
                <li>{new Date(data.data.createdAt).toLocaleString()}</li>
              </SubTitles>
            </ContentWrapper>
          </ImgWrapper>
          <OneLineDesc> 스터디 구성원({approvedMembers.length}명) : 
            {approvedMembers.map((member) => (
              <StStudyMember key={member.memberId}> {member.memberName}. </StStudyMember>
          ))}
          </OneLineDesc>
          <OneLineDesc>{data.data.content}</OneLineDesc>
          <StCommentText>우리 스터디 방명록</StCommentText>
          <StInput 
          type ="text"
          placeholder = '오늘의 한마디를 적어주세요'
          />
      </>
    )}
    </DetailWrapper>
  );
};
export default Detail;
