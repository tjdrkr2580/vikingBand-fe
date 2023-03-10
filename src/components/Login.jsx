import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../element/Button";
import { modalVariants } from "../utils/animations/variants";
import {
  isModalState,
  isUserState,
  userInfoState,
} from "../utils/recoil/atoms";
import {
  modalStyle,
  modalWrapperStyle,
  errorStyle,
} from "../utils/styles/mixins";
import { addNewUser, loginUser } from "../utils/axios/axios";
import { useMutation } from "react-query";
import axios from "axios";

const ModalWrapper = styled.section`
  ${modalWrapperStyle}
`;

const ErrorMessage = styled.p`
  ${errorStyle}
`;

const Modal = styled(motion.form)`
  ${modalStyle}
`;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const modalRef = useRef(null);
  const setVisible = useSetRecoilState(isModalState);
  const setUserInfo = useSetRecoilState(userInfoState);
  const setIsUser = useSetRecoilState(isUserState);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const registerMutation = useMutation((newUser) => addNewUser(newUser));
  const loginMutation = useMutation((User) => loginUser(User));
  const onSubmit = async (data) => {
    if (isRegister !== true) {
      const User = {
        memberName: data.userId,
        password: data.password,
      };
      const res = await loginMutation.mutateAsync(User);
      setUserInfo(res.data.data);
      axios.defaults.headers.common["Authorization"] =
        res.headers.authorization;
      setIsUser(true);
      setVisible(false);
    } else {
      const newUser = {
        memberName: data.userId,
        email: data.email,
        password: data.password,
      };
      const response = await registerMutation.mutateAsync(newUser);
      setIsRegister(false);
      reset();
    }
  };

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setVisible(false);
        }
      }}
    >
      <Modal
        variants={modalVariants}
        initial="start"
        animate="animate"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isRegister !== true ? (
          <>
            <h1>?????????</h1>
            <input
              type="text"
              {...register("userId", { required: "???????????? ??????????????????." })}
              placeholder="?????????"
            />
            {errors?.userId && (
              <ErrorMessage>{errors.userId?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("password", {
                required: "??????????????? ??????????????????.",
              })}
              placeholder="????????????"
            />
            {errors?.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
            <p>
              ????????? ???????????? ????????????????{" "}
              <span
                onClick={() => {
                  setIsRegister(true);
                  reset();
                }}
              >
                ????????????
              </span>
            </p>
            <Button wh="m">?????????</Button>
          </>
        ) : (
          <>
            <h1>????????????</h1>
            <input
              type="text"
              {...register("userId", {
                required: "???????????? ??????????????????.",
                minLength: {
                  value: 4,
                  message: "4?????? ????????? ???????????? ???????????????.",
                },
              })}
              placeholder="?????????"
            />
            {errors?.userId && (
              <ErrorMessage>{errors.userId?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("password", {
                required: "??????????????? ??????????????????.",
                minLength: {
                  value: 8,
                  message: "8?????? ????????? ??????????????? ???????????????.",
                },
              })}
              placeholder="????????????"
            />
            {errors?.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("passwordConfirm", {
                required: "???????????? ????????? ???????????????.",
              })}
              placeholder="???????????? ??????"
            />
            {errors?.passwordConfirm && (
              <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
            )}
            <input
              type="text"
              {...register("email", {
                required: "???????????? ???????????????.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "????????? ????????? ?????? ????????????.",
                },
              })}
              placeholder="?????????"
            />
            {errors?.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
            <p>
              ?????? ????????? ???????????????????{" "}
              <span
                onClick={() => {
                  setIsRegister(false);
                  reset();
                }}
              >
                ?????????
              </span>
            </p>
            <Button wh="m">????????????</Button>
          </>
        )}
      </Modal>
    </ModalWrapper>
  );
};

export default Login;
