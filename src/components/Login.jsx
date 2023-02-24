import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
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
  height: 40rem;
  background-color: ${(props) => props.theme.bgColor};
  ${boxBorderRadius}
`;

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const modalRef = useRef(null);
  const setVisible = useSetRecoilState(isModalState);
  return (
    <ModalWrapper
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setVisible(false);
        }
      }}
    >
      <Modal></Modal>
    </ModalWrapper>
  );
};

export default Login;
