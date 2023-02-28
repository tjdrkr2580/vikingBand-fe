import React from "react";
import styled from "styled-components";
import study from "../assets/study.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getStudy, postStudyRegist, postStudyWish } from "../utils/axios/axios";
import Button from "../element/Button";
import {
  DetailWrapper,
  ImgWrapper,
  ContentWrapper,
  SubTitles,
  IconsLayout,
  OneLineDesc,
} from "./style";

const Detail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const wishMutate = useMutation((id) => postStudyWish(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("study");
    },
  });
  const onWish = async (id) => {
    const res = await wishMutate.mutateAsync(id);
  };
  const { isLoading, data } = useQuery("study", () => getStudy(id));
  const likedStatus = data.data.wished;
  if (isLoading === false) console.log(likedStatus);
  const registerMutate = useMutation((id) => postStudyRegist(id));
  const onRegister = async (id) => {
    const res = await registerMutate.mutateAsync(id);
  };
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
          <Button onClick={() => onRegister(data.data.studyId)}>
            가입 신청
          </Button>
        </>
      )}
    </DetailWrapper>
  );
};
export default Detail;
