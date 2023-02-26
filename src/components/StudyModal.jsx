import React, { useRef } from "react";
import styled from "styled-components";
import { studyModalState } from "../utils/recoil/atoms";
import { modalStyle, modalWrapperStyle } from "../utils/styles/mixins";
import { useSetRecoilState } from "recoil";

const StudyModalWrapper = styled.section`
  ${modalWrapperStyle}
`;

const StudyModalForm = styled.form`
  ${modalStyle}
`;

const StudyModal = () => {
  const studymodal = useRef(null);
  const studyModalVisible = useSetRecoilState(studyModalState);
  return (
    <StudyModalWrapper
      ref={studymodal}
      onClick={(e) => {
        if (studymodal.current === e.target) {
          studyModalVisible(false);
        }
      }}
    >
      <StudyModalForm></StudyModalForm>
    </StudyModalWrapper>
  );
};

export default StudyModal;
