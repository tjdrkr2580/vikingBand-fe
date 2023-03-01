import React from "react";
import { AiFillHeart } from "react-icons/ai";
import styled from "styled-components";
import {
  elipsis,
  fontBig,
  fontMedium,
  fontSmall,
} from "../utils/styles/mixins";
import Button from "../element/Button";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteStudy, getStudy } from "../utils/axios/axios";

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
  justify-content: space-between;

  h1 {
    width: 12rem;
    ${elipsis}
    ${fontMedium}
  }
`;

const Like = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    ${fontSmall}
  }
`;

const Text = styled.h1`
  ${fontBig}
`;

const MyStudy = ({ data }) => {
  const queryClient = useQueryClient();
  const onDeleteMutation = useMutation((studyId) => deleteStudy(studyId), {
    onSuccess: () => {
      queryClient.invalidateQueries("detailInfo");
    },
  });

  const { isLoading, res } = useQuery("detailInfo", (studyId) =>
    getStudy(studyId)
  );

  const onDelete = async (studyId) => {
    const res = onDeleteMutation.mutateAsync(studyId);
    console.log(res);
  };

  return (
    <>
      {data.length === 0 && <Text>생성하신 스터디가 존재하지 않습니다.</Text>}
      <MyStudyLists>
        {data.length !== 0 &&
          data.map((data) => (
            <MyStudyList key={data.studyId}>
              <h1>{data.title}</h1>
              <Like>
                <AiFillHeart size={20} color="EB455F" />
                <span>{data.likes}</span>
              </Like>
              <Button wh="s" onClick={() => onDelete(data.studyId)}>
                삭제
              </Button>
            </MyStudyList>
          ))}
      </MyStudyLists>
    </>
  );
};

export default MyStudy;
