import React, { useEffect } from "react";
import study from "../assets/study.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteStudyRegist,
  getStudy,
  postStudyRegist,
  postStudyWish,
  postBoard,
  deleteBoard,
  getComment,
  postComment,
} from "../utils/axios/axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isModalState,
  isUserState,
  userInfoState,
} from "../utils/recoil/atoms";
import { getUserDetailInfo } from "../utils/axios/axios";
import Button from "../element/Button";
import useInput from "../hooks/useInput";
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
  const isUser = useRecoilValue(isUserState);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setModalState = useSetRecoilState(isModalState);
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
  const {
    value: title,
    onChange: titleChangeHandler,
    reset: resetTitle,
  } = useInput("");
  const {
    value: content,
    onChange: contentChangeHandler,
    reset: resetContent,
  } = useInput("");

  //스터디보드 POST
  const board = {
    title,
    content,
  };

  const postBoardMutate = useMutation(
    ({ id, board }) => postBoard({ id, board }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("study");
      },
    }
  );

  const onClickPostBoard = async ({ id, board }) => {
    if (board.title === "" || board.content === "") {
      alert("제목과 내용을 입력해 주세요!");
    } else {
      await postBoardMutate.mutateAsync({ id, board });
    }
    resetTitle();
    resetContent();
  };

  //스터디 보드 DELETE

  const deleteBoardMutate = useMutation((id) => deleteBoard(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });

  const onDeleteBoard = async (id) => {
    const res = await deleteBoardMutate.mutateAsync(id);
  };

  // 스터디보드에 접속한 유저 아이디뽑기
  const userInfo = useRecoilValue(userInfoState);
  const res = useQuery("detailInfo", () => {
    return getUserDetailInfo(userInfo.memberId);
  });
  if (res.isLoading === false) {
    // console.log(userInfo.memberName);
  }

  // Query로 스터디 데이터 가져오기
  const { isLoading, data } = useQuery("study", () => getStudy(id));
  const likedStatus = data?.data.wished;
  const appliedStatus = data?.data.applied;
  const approvedStatus = data?.data.approved;

  const approvedMembers = data?.data.appliedMembers?.filter(
    (member) => member.approved === true
  );
  const boardInfos = data?.data.studyBoards.sort((a, b) => b.id - a.id);

  // Query로 댓글 데이터 가져오기
  const { isLoading: commentLoading, data: commentData } = useQuery(
    "comment",
    () => getComment(id)
  );

  //각 스터디보드 정보
  const boardData = boardInfos?.map(
    ({ id, memberId, memberName, title, content, createdAt }) => ({
      id,
      memberId,
      memberName,
      title,
      content,
      createdAt,
    })
  );

  //댓글 입력값
  const {
    value: comment,
    onChange: commentChangeHandler,
    reset: resetComment,
  } = useInput("");

  //댓글 POST 요청

  const newComment = {
    content: comment,
  };

  const postCommentMutate = useMutation(
    ({ id, newComment }) => postComment({ id, newComment }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comment");
      },
    }
  );

  const onClickPostComment = async ({ id, newComment }) => {
    await postCommentMutate.mutateAsync({ id, newComment });
    resetComment();
  };

  useEffect(() => {
    if (isUser === false) {
      navigate("/");
      setModalState(true);
    }
  }, []);

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

          <StCommentText>한 줄 일기</StCommentText>
          <StInput
            type="text"
            placeholder="제목"
            value={title}
            onChange={titleChangeHandler}
          />

          <StInput
            height="12rem"
            type="text"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={contentChangeHandler}
          />
          <Button wh="l" onClick={() => onClickPostBoard({ id, board })}>
            제출
          </Button>

          <StCommentText>Study Board 모음</StCommentText>

          <div>
            {boardData &&
              boardData.map((item, idx) => (
                <BoardBox key={idx}>
                  <div className="memberName">{item.memberName}</div>
                  <div className="createdAt">{item.createdAt}</div>
                  <div className="boardTitle">제목 : {item.title}</div>
                  <div className="boardContent">내용 : {item.content}</div>

                  {item.memberName === userInfo.memberName && (
                    <Button
                      wh="m"
                      className="deleteButton"
                      onClick={() => onDeleteBoard(item.id)}
                    >
                      방명록 삭제
                    </Button>
                  )}
                </BoardBox>
              ))}
          </div>
        </>
      )}
    </DetailWrapper>
  );
};
export default Detail;
