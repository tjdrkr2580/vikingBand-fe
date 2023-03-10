import React, { useRef, useState } from "react";
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
import { addNewStudy, postImageUpload } from "../utils/axios/axios";
import imageCompression from "browser-image-compression";

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
  const [url, setUrl] = useState("");
  const queryClient = useQueryClient();
  const studymodal = useRef(null);
  const setStudyModalVisible = useSetRecoilState(studyModalState);
  const imgMutation = useMutation((data) => postImageUpload(data));

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

  const onHandleFile = async (e) => {
    const imgFile = e.target.files[0];
    const option = {
      maxSizeMB: 2,
    };
    const sizingImg = await imageCompression(imgFile, option);
    try {
      const imgForm = new FormData();
      console.log(imgFile);
      imgForm.append("file", new File([sizingImg], sizingImg.name));
      const res = await imgMutation.mutateAsync(imgForm);
      setUrl(res.data["imageUrl"]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async (data) => {
    const newStudy = {
      title: data.title,
      subject: data.subject,
      content: data.content,
      imageUrl: url,
      maxMember: parseInt(data.maxMember),
    };
    console.log(newStudy);
    const res = await studyCreateMutate.mutateAsync(newStudy);
    console.log(res);
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
        <h1>????????? ??????</h1>
        <input
          type="text"
          placeholder="??????."
          {...register("title", {
            required: "????????? ??????????????????.",
            minLength: 3,
          })}
        />
        {errors?.title && <ErrorMessage>{errors.title?.message}</ErrorMessage>}
        {errors?.title?.type === "minLength" && (
          <ErrorMessage>????????? 3?????? ?????? ??????????????????.</ErrorMessage>
        )}
        <input
          type="text"
          placeholder="??????."
          {...register("subject", {
            minLength: 3,
            required: "????????? ??????????????????.",
          })}
        />
        {errors?.subject && (
          <ErrorMessage>{errors.subject?.message}</ErrorMessage>
        )}
        {errors?.subject?.type === "minLength" && (
          <ErrorMessage>????????? 2?????? ?????? ??????????????????.</ErrorMessage>
        )}
        <input
          type="text"
          placeholder="??? ??? ??????."
          {...register("content", {
            required: "????????? ??????????????????.",
          })}
        />
        {errors?.content && (
          <ErrorMessage>{errors.content?.message}</ErrorMessage>
        )}
        <input
          type="number"
          placeholder="?????? ?????? (2??? ??????)"
          {...register("maxMember", {
            required: "????????? ??????????????????.",
            min: 2,
            max: 100,
          })}
        />
        {errors?.maxMember && (
          <ErrorMessage>{errors.maxMember?.message}</ErrorMessage>
        )}
        {errors?.maxMember?.type === "min" && (
          <ErrorMessage>?????? ????????? 2?????????.</ErrorMessage>
        )}
        {errors?.maxMember?.type === "max" && (
          <ErrorMessage>?????? ????????? 100?????????.</ErrorMessage>
        )}
        <input type="file" typeof="image/*" onChange={onHandleFile} />
        <Button wh="l">????????? ??????</Button>
      </StudyModalForm>
    </StudyModalWrapper>
  );
};

export default StudyModal;
