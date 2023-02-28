import React, { useRef } from "react";
import styled from "styled-components";
import { studyModalState } from "../utils/recoil/atoms";
import {
  errorStyle,
  modalStyle,
  modalWrapperStyle,
} from "../utils/styles/mixins";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Button from "../element/Button";
import { motion } from "framer-motion";
import { modalVariants } from "../utils/animations/variants";
import { useMutation, useQueryClient } from "react-query";
import { addNewStudy } from "../utils/axios/axios";

const StudyModalWrapper = styled.section`
  ${modalWrapperStyle}
`;

const StudyModalForm = styled(motion.form)`
  ${modalStyle}
`;

const ErrorMessage = styled.p`
  ${errorStyle}
`;

const StudyModal = () => {
  const queryClient = useQueryClient();
  const studymodal = useRef(null);
  const setStudyModalVisible = useSetRecoilState(studyModalState);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const studyCreateMutate = useMutation((newStudy) => addNewStudy(newStudy), {
    onSuccess: () => {
      queryClient.invalidateQueries("studies");
    },
  });

  const onSubmit = async (data) => {
    const newStudy = {
      title: data.title,
      subject: data.subject,
      content: data.content,
      maxMember: parseInt(data.maxMember),
    };
    const res = await studyCreateMutate.mutateAsync(newStudy);
    setStudyModalVisible(false);
    reset();
  };

  return (
    <StudyModalWrapper
      ref={studymodal}
      onClick={(e) => {
        if (studymodal.current === e.target) {
          setStudyModalVisible(false);
        }
      }}
    >
      <StudyModalForm
        variants={modalVariants}
        initial="start"
        animate="animate"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>스터디 생성</h1>
        <input
          type="text"
          placeholder="제목."
          {...register("title", {
            required: "제목을 입력해주세요.",
            minLength: 3,
          })}
        />
        {errors?.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        {errors?.title?.type === "minLength" && (
          <ErrorMessage>제목을 3글자 이상 입력해주세요.</ErrorMessage>
        )}
        <input
          type="text"
          placeholder="주제."
          {...register("subject", {
            minLength: 3,
            required: "주제를 입력해주세요.",
          })}
        />
        {errors?.subject && (
          <ErrorMessage>{errors.subject?.message}</ErrorMessage>
        )}
        {errors?.subject?.type === "minLength" && (
          <ErrorMessage>주제를 2글자 이상 입력해주세요.</ErrorMessage>
        )}
        <input
          type="text"
          placeholder="한 줄 소개."
          {...register("content", {
            required: "소개를 입력해주세요.",
          })}
        />
        {errors?.content && (
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        )}
        <input
          type="number"
          placeholder="최대 인원 (2명 이상)"
          {...register("maxMember", {
            required: "인원을 입력해주세요.",
            min: 2,
            max: 100,
          })}
        />
        {errors?.maxMember && (
          <ErrorMessage>{errors.maxMember?.message}</ErrorMessage>
        )}
        {errors?.maxMember?.type === "min" && (
          <ErrorMessage>최소 범위는 2입니다.</ErrorMessage>
        )}
        {errors?.maxMember?.type === "max" && (
          <ErrorMessage>최대 범위는 100입니다.</ErrorMessage>
        )}
        <Button wh="l">스터디 생성</Button>
      </StudyModalForm>
    </StudyModalWrapper>
  );
};

export default StudyModal;
