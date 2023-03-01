import React from "react";
import { useQuery } from "react-query";
import { getStudy } from "../utils/axios/axios";

const MyStudyDetail = ({ studyId }) => {
  const { isLoading, data } = useQuery("detailInfo", (studyId) =>
    getStudy(studyId)
  );
  if (isLoading === false) {
    console.log(data);
  }
  return <div>MyStudyList</div>;
};

export default MyStudyDetail;
