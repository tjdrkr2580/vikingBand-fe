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
import {
  deleteStudy,
  getStudy,
  putApprove,
  putDeny,
} from "../utils/axios/axios";
import MyStudyDetail from "./MyStudyDetail";

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

const ApplyLists = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ApplyList = styled.li`
  width: 65vw;
  min-width: 28rem;
  max-width: 70rem;
  height: 4.5rem;
  padding: 1rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    width: 20rem;
    ${elipsis}
    ${fontMedium}
  }
`;

const MyStudy = ({ data }) => {
  console.log(data);
  const queryClient = useQueryClient();
  const onDeleteMutation = useMutation((studyId) => deleteStudy(studyId), {
    onSuccess: () => {
      queryClient.invalidateQueries("detailInfo");
    },
  });
  const onApproveMutation = useMutation(
    ({ studyId, registMemberId }) => putApprove({ studyId, registMemberId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailInfo");
      },
    }
  );
  const onDenyMutation = useMutation(
    ({ studyId, registMemberId }) => putDeny({ studyId, registMemberId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("detailInfo");
      },
    }
  );

  const onApprove = async (studyId, registMemberId) => {
    const res = onApproveMutation.mutateAsync({ studyId, registMemberId });
    console.log(res);
  };

  const onDeny = async (studyId, registMemberId) => {
    const res = onDenyMutation.mutateAsync({ studyId, registMemberId });
    console.log(res);
  };

  const onDelete = async (studyId) => {
    const res = onDeleteMutation.mutateAsync(studyId);
    console.log(res);
  };

  if (data !== undefined) {
    console.log(data);
  }

  return (
    <>
      {data !== undefined && (
        <MyStudyLists>
          {data.length === 0 && <Text>생성하신 스터디가 없습니다.</Text>}
          {data.length !== 0 &&
            data.map((study) => (
              <>
                <MyStudyList key={study.studyId}>
                  <h1>{study?.title}</h1>
                  <Button onClick={() => onDelete(study.studyId)}>삭제</Button>
                </MyStudyList>
                <ApplyLists>
                  {study?.appliedMembers?.map((member) => (
                    <ApplyList key={member.title}>
                      <h1>신청한 유저 : {member.memberName}</h1>
                      <Button
                        onClick={() =>
                          onApprove(study.studyId, member.memberId)
                        }
                      >
                        수락
                      </Button>
                      <Button
                        onClick={() => onDeny(study.studyId, member.memberId)}
                      >
                        거절
                      </Button>
                    </ApplyList>
                  ))}
                </ApplyLists>
              </>
            ))}
        </MyStudyLists>
      )}
    </>
  );
};

export default MyStudy;
