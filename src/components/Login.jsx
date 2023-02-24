import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import Button from "../element/Button";
import { modalVariants } from "../utils/animations/variants";
import { isModalState } from "../utils/recoil/atoms";
import { boxBorderRadius, flexCenter } from "../utils/styles/mixins";

const ModalWrapper = styled.section`
  position: absolute;
  z-index: 999;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  ${flexCenter};
`;

const Modal = styled(motion.div)`
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
  } = useForm();

  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setVisible(false);
        }
      }}
    >
      <Modal variants={modalVariants} initial="start" animate="animate">
        {isRegister !== true ? (
          <>
            <h1>로그인</h1>
            <input type="text" {...register("userId")} placeholder="아이디" />
            <input
              type="password"
              {...register("password")}
              placeholder="비밀번호"
            />
            <p>
              계정이 존재하지 않으신가요?{" "}
              <span onClick={() => setIsRegister(true)}>회원가입</span>
            </p>
            <Button wh="m">로그인</Button>
          </>
        ) : (
          <>
            <h1>회원가입</h1>
            <input type="text" {...register("userId")} placeholder="아이디" />
            <input
              type="password"
              {...register("password")}
              placeholder="비밀번호"
            />
            <input
              type="password"
              {...register("passwordConfirm")}
              placeholder="비밀번호 확인"
            />
            <input
              type="text"
              {...register("passwordConfirm")}
              placeholder="이메일"
            />
            <p>
              이미 계정이 존재하신가요?{" "}
              <span onClick={() => setIsRegister(false)}>로그인</span>
            </p>
            <Button wh="m">회원가입</Button>
          </>
        )}
      </Modal>
    </ModalWrapper>
  );
};

export default Login;
