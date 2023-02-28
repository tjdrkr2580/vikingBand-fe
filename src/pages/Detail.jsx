import React from "react";
import styled from "styled-components";
import study from "../assets/study.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { pageMargin, fontSmall, fontSmaller } from "../utils/styles/mixins";
import { flexCenter, boxBorderRadius } from "../utils/styles/mixins";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getStudy, postBoard, postStudyWish } from "../utils/axios/axios";
import Button from "../element/Button";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../utils/recoil/atoms";

const DetailWrapper = styled.div`
  min-width: 100vw;
  ${flexCenter}
  flex-direction: column;
  ${pageMargin}
`;

const ImgWrapper = styled.section`
  width: 97.5%;
  position: relative;
  height: 25rem;
  img {
    ${boxBorderRadius}
    width: 100%;
    height: 100%;
    filter: brightness(55%);
    vertical-align: middle;
    object-fit: cover;
  }
`;

const ContentWrapper = styled.section`
  z-index: 997;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${flexCenter}
  flex-direction: column;
  gap: 1rem;

  h1 {
    color: white;
    font-size: 2.8rem;
  }

  p {
    color: white;
    ${fontSmall}
  }
`;

const SubTitles = styled.ul`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-direction: column;
  li {
    color: white;
    width: fit-content;
    ${fontSmaller}
  }
`;

const IconsLayout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: white;
  span {
    ${fontSmaller}
    padding-bottom: 0.2rem;
  }
`;

const OneLineDesc = styled.section`
  height: 20rem;
  ${flexCenter}
  ${fontSmall}
`;

const BoardAddWrapper = styled.form`
  padding: 0 1rem;
  width: 100%;
  max-width: 50rem;
  ${flexCenter}
  display : flex;
  flex-direction: column;
  gap: 1rem;
  height: 15rem;
  input {
    background-color: transparent;
    height: 4rem;
    color: ${(props) => props.theme.textColor3};
    letter-spacing: 0.08rem;
    font-size: 1.35rem;
    padding: 0.4rem 0.8rem;
    border: 0.1rem solid #797777;
    border-radius: 0.8rem;

    &:focus {
      outline: none;
    }
  }
  .title {
    align-self: flex-start;
    width: 15rem;
    margin-left: 0.5rem;
  }
  .content {
    width: 98%;
  }
  button {
    align-self: flex-end;
  }
`;

const Detail = () => {
  const [liked, setLiked] = useState(false);
  const [isMade, setIsMade] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const { register, reset, handleSubmit } = useForm();
  const handleLikeClick = () => {
    setLiked(!liked);
    if (!liked) {
      alert("찜한 스터디에 추가되었습니다.");
    } else {
      alert("찜한 스터디에서 삭제되었습니다.");
    }
  };
  const [registered, setRegistered] = useState(false);
  const handleRegisterButton = (studyId) => {
    setRegistered(!registered);
    if (!registered) {
      alert("가입 신청 완료!");
    } else {
      alert("가입 신청 취소 완료!");
    }
  };
  const navigate = useNavigate();
  const backToHomeHandler = () => {
    navigate("/");
  };
  // const { data } = useQuery("studies", getStudies);
  // const posts = data.data.data;
  // const post = posts.find((post) => post.studyId === parseInt(id));

  const queryClient = useQueryClient();

  const boardMutate = useMutation((id, data) => postBoard({ id, data }));

  const { id } = useParams();

  const { isLoading, data } = useQuery("study", () => getStudy(id), {
    onSuccess: () => {},
  });
  if (isLoading === false) console.log(data.data);
  

  const wishMutate = useMutation((id) => postStudyWish(id));

  // 하트 누른 게시글의 아이디 정보 담아서 post 요청 보냄
  const onWish = async (id) => {
    try {
      const res = await wishMutate.mutateAsync(id, {
        onSuccess: () => {
          queryClient.invalidateQueries("study");
        },
      });
    } catch (err) {
      alert("로그인 혹은 토큰이 잘못되었습니다!");
    }
  };

  const onBoard = async (data) => {
    console.log(data);
  };

  const registerMutate = useMutation((id) => postStudyRegist(id));

  const onRegister = async (id) => {
    const res = await registerMutate.mutateAsync(id);
  };

  const registerMutate = useMutation((id) => postStudyRegist(id) )

  const onRegister = async (id) => {
    const res = await registerMutate.mutateAsync(id)
  }

  return (
    <DetailWrapper>
      {isLoading === false && data !== undefined && (
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
                  color="FF597B"
                  cursor="pointer"
                  size="24"
                  onClick={() => onWish(data.data.studyId)}
                />
                <span>{data.data.likes}</span>
              </IconsLayout>
            </ContentWrapper>
          </ImgWrapper>
          <OneLineDesc>{data.data.content}</OneLineDesc>
          <BoardAddWrapper onSubmit={handleSubmit(onBoard)}>
            <input
              type="text"
              className="title"
              placeholder="제목"
              {...register("content", {
                required: true,
              })}
            />
            <input
              type="text"
              className="content"
              placeholder="글을 작성해주세요"
              {...register("title", {
                required: true,
              })}
            />
            <Button>추가</Button>
          </BoardAddWrapper>
        </>
      )}
    </DetailWrapper>
  );
};
export default Detail;
