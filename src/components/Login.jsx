import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../element/Button";
import { modalVariants } from "../utils/animations/variants";
import { isModalState } from "../utils/recoil/atoms";
import { boxBorderRadius, flexCenter } from "../utils/styles/mixins";
import { addNewUser } from "../utils/axios/axios";
import { useMutation } from "react-query";

const ModalWrapper = styled.section`
  position: absolute;
  z-index: 999;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  ${flexCenter};
`;

const ErrorMessage = styled.p`
  width: 25rem;
  font-size: 1.15rem;
  padding-right: 5rem;
  margin: -0.5rem 0;
  color: ${(props) => props.theme.primary};
`;

const Modal = styled(motion.form)`
  width: 35rem;
  height: 42.5rem;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.bgColor};
  ${boxBorderRadius}
  input {
    width: 20rem;
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
  h1 {
    margin-left: 3rem;
    font-size: 2.2rem;
    align-self: flex-start;
    margin-bottom: 1rem;
  }
  p {
    font-weight: 500;
    padding-left: 3.5rem;
    font-size: 1.075rem;
  }
  span {
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    cursor: pointer;
    font-size: 1.075rem;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const modalRef = useRef(null);
  const setVisible = useSetRecoilState(isModalState);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // const {isLoading, isError, data} = useQuery("newUser", addNewUser)

  const registerMutation = useMutation((newUser) => addNewUser(newUser))
  

  const onSubmit = async (data) => {
  
    if (isRegister !== true) {
      
    } else {
      const newUser = {
        username : data.userId,
        email: data.email,
        password: data.password
      }
      
      const response = await registerMutation.mutateAsync(newUser)
      console.log(response)
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
                  value: 4,
                  message: "4자리 이상의 비밀번호를 입력하세요.",
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
                minLength: {
                  value: 4,
                  message: "4자리 이상의 비밀번호를 사용하세요.",
                },
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
