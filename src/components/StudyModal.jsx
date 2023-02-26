import React, { useRef } from "react";
import styled from "styled-components";
import { studyModalState } from "../utils/recoil/atoms";
import { modalStyle, modalWrapperStyle } from "../utils/styles/mixins";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Button from "../element/Button";
import { motion } from "framer-motion";
import { modalVariants } from "../utils/animations/variants";

const StudyModalWrapper = styled.section`
  ${modalWrapperStyle}
`;

const StudyModalForm = styled(motion.form)`
  ${modalStyle}
`;

const StudyModal = () => {
  const studymodal = useRef(null);
  const studyModalVisible = useSetRecoilState(studyModalState);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <StudyModalWrapper
      ref={studymodal}
      onClick={(e) => {
        if (studymodal.current === e.target) {
          studyModalVisible(false);
        }
      }}
    >
      <StudyModalForm
        variants={modalVariants}
        initial="start"
        animate="animate"
        onSubmit={handleSubmit}
      >
        <h1>스터디 생성</h1>
        <input
          type="text"
          placeholder="제목."
          {...register("title", {
            required: "제목을 입력해주세요.",
          })}
        />
        <input
          type="text"
          placeholder="주제."
          {...register("subject", {
            required: "주제를 입력해주세요.",
          })}
        />
        <input
          type="text"
          placeholder="한 줄 소개."
          {...register("content", {
            required: "소개를 입력해주세요.",
          })}
        />
        <input
          type="number"
          placeholder="최대 인원 (2명 이상)"
          {...register("maxMember", {
            required: "인원을 입력해주세요.",
            min: 2,
            max: 100,
          })}
        />
        <Button wh="l">스터디 생성</Button>
      </StudyModalForm>
    </StudyModalWrapper>
  );
};

export default StudyModal;
