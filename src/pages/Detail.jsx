import React from "react";
import study from "../assets/study.jpg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { deleteStudyRegist, getStudy, postStudyRegist, postStudyWish, postBoard } from "../utils/axios/axios";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../utils/recoil/atoms";
import { getUserDetailInfo } from "../utils/axios/axios";

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
  StInput,
  BoardBox,
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

  //가입신청
  const registerMutate = useMutation((id) => postStudyRegist(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });
  const onRegister = async (id) => {
    await registerMutate.mutateAsync(id);
  };

  // 가입신청 취소
  const cancelRegisterMutate = useMutation((id) => deleteStudyRegist(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });
  const onCancelRegister = async (id) => {
    await cancelRegisterMutate.mutateAsync(id);
  };

  // 스터디보드 제목/내용
  const [title, setTitle] = useState('')
  const titleChangeHandler = (e) => {
    setTitle(e.target.value)
  }

  const [content, setContent] = useState('')
  const contentChangeHandler = (e) => {
    setContent(e.target.value)
  }

  //스터디보드 POST
  const board = {
    title,
    content
  }

  const postBoardMutate = useMutation(({id, board}) => postBoard({id, board}), {
    onSuccess: () => {
      queryClient.invalidateQueries("study")
    }
  });
  const onClickPostBoard = async ({id, board}) => {
    await postBoardMutate.mutateAsync({id, board});
  };

  // 스터디보드에 접속한 유저 아이디뽑기 
  const userInfo = useRecoilValue(userInfoState);
  const res = useQuery("detailInfo", () => {
    return getUserDetailInfo(userInfo.memberName);
  });
  if (res.isLoading === false) {
    console.log(userInfo.memberName);
  }

  // 데이터 Query로 가져오기
  const { isLoading, data } = useQuery("study", () => getStudy(id));
  if (isLoading === false) console.log(data.data)
  const likedStatus = data?.data.wished;
  const appliedStatus = data?.data.applied;
  const approvedStatus = data?.data.approved;
  const approvedMembers = data?.data.appliedMembers?.filter((member) => member.approved === true)

  //방명록 정보

  const boardInfos = data.data.studyBoards.sort((a,b) => b.id - a.id)
  console.log(boardInfos)
  const boardData = boardInfos.map(({ memberName, title, content, createdAt }) => ({
    memberName,
    title,
    content,
    createdAt
  }));

  return (
    <DetailWrapper>
      {/* 가입신청 승인 전 */}
      {isLoading === false &&
        data !== undefined &&
        approvedStatus === false && (
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
            <Button
              wh="l"
              onClick={
                !appliedStatus
                  ? () => onRegister(data.data.studyId)
                  : () => onCancelRegister(data.data.studyId)
              }
            >
              {!appliedStatus ? "가입 신청" : "가입 신청 취소"}
            </Button>
          </>
        )}

      {isLoading === false && data !== undefined && approvedStatus === true && (
        <>
          <ImgWrapper>
            <img
              src={data.data.imageUrl === "" ? study : data.data.imageUrl}
              alt="study"
            />
            <ContentWrapper>
              <h1>{data.data.title}</h1>
              <SubTitles>
                <li>스터디 리더 : {data.data.author.memberName}</li>
                <li>{new Date(data.data.createdAt).toLocaleString()}</li>
              </SubTitles>
            </ContentWrapper>
          </ImgWrapper>
          <OneLineDesc>
            {" "}
            스터디 구성원({approvedMembers.length}명) :
            {approvedMembers.map((member) => (
              <StStudyMember key={member.memberId}>
                {" "}
                {member.memberName}.{" "}
              </StStudyMember>
            ))}
          </OneLineDesc>
          <OneLineDesc>{data.data.content}</OneLineDesc>

          <StCommentText>방명록 쓰기</StCommentText>
          <StInput 
          type ="text"
          placeholder = {`${userInfo.memberName}님의 방명록 제목`}
          value = {title}
          onChange = {titleChangeHandler}
          />
          <StInput
          height = '12rem'
          type ="text"
          placeholder = '내용을 입력해 주세요'
          value = {content}
          onChange = {contentChangeHandler}
          />
          <Button 
          wh = "l"
          onClick = {() => onClickPostBoard({id, board})}
          >제출</Button>

          <StCommentText>방명록 모음</StCommentText>

          <div>
          {boardData.map((item, index) => (
          <div key={index}>
          <BoardBox>
          <div className="memberName">작성자 : {item.memberName}</div> 
          <div className ="createdAt">{item.createdAt.substring(0,19)}</div>
          <div className="boardTitle">제목 : {item.title} </div>
          <div className="boardContent">내용 : {item.content}</div> 
          </BoardBox>
          </div>
        ))}
            
          </div>    
          
      </>
    )}
    </DetailWrapper>
  );
};
export default Detail;
