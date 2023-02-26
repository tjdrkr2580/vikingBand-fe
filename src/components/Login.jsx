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
import { modalStyle, modalWrapperStyle } from "../utils/styles/mixins";
import { addNewUser, loginUser } from "../utils/axios/axios";
import { useMutation } from "react-query";
import { useCookies } from "react-cookie";

const ModalWrapper = styled.section`
  ${modalWrapperStyle}
`;

const ErrorMessage = styled.p`
  width: 25rem;
  font-size: 1.15rem;
  padding-right: 5rem;
  margin: -0.5rem 0;
  color: ${(props) => props.theme.primary};
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
  const [cookies, setCookie] = useCookies();
  const registerMutation = useMutation((newUser) => addNewUser(newUser));
  const loginMutation = useMutation((User) => loginUser(User));
  const onSubmit = async (data) => {
    if (isRegister !== true) {
      const User = {
        username: data.userId,
        password: data.password,
      };
      const res = await loginMutation.mutateAsync(User);
      await setCookie("viking-band-token", res.headers.authorization);
      setUserInfo(res.data.data);
      console.log(res.data);
      setIsUser(true);
      setVisible(false);
    } else {
      const newUser = {
        username: data.userId,
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
            <h1>로그인</h1>
            <input
              type="text"
              {...register("userId", { required: "아이디를 입력해주세요." })}
              placeholder="아이디"
            />
            {errors?.userId && (
              <ErrorMessage>{errors.userId?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
              })}
              placeholder="비밀번호"
            />
            {errors?.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
            <p>
              계정이 존재하지 않으신가요?{" "}
              <span
                onClick={() => {
                  setIsRegister(true);
                  reset();
                }}
              >
                회원가입
              </span>
            </p>
            <Button wh="m">로그인</Button>
          </>
        ) : (
          <>
            <h1>회원가입</h1>
            <input
              type="text"
              {...register("userId", {
                required: "아이디를 입력해주세요.",
                minLength: {
                  value: 4,
                  message: "4자리 이상의 아이디를 입력하세요.",
                },
              })}
              placeholder="아이디"
            />
            {errors?.userId && (
              <ErrorMessage>{errors.userId?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "8자리 이상의 비밀번호를 입력하세요.",
                },
              })}
              placeholder="비밀번호"
            />
            {errors?.password && (
              <ErrorMessage>{errors.password?.message}</ErrorMessage>
            )}
            <input
              type="password"
              {...register("passwordConfirm", {
                required: "비밀번호 확인을 입력하세요.",
              })}
              placeholder="비밀번호 확인"
            />
            {errors?.passwordConfirm && (
              <ErrorMessage>{errors.passwordConfirm?.message}</ErrorMessage>
            )}
            <input
              type="text"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "이메일 형식에 맞지 않습니다.",
                },
              })}
              placeholder="이메일"
            />
            {errors?.email && (
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            )}
            <p>
              이미 계정이 존재하신가요?{" "}
              <span
                onClick={() => {
                  setIsRegister(false);
                  reset();
                }}
              >
                로그인
              </span>
            </p>
            <Button wh="m">회원가입</Button>
          </>
        )}
      </Modal>
    </ModalWrapper>
  );
};

export default Login;
