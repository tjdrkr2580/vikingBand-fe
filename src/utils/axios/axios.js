import axios from "axios";

axios.defaults.withCredentials = true;

export const loginUser = async (User) => {
  const response = await axios.post(`/api/members/login`, User);
  return response;
};

export const addNewUser = async (newUser) => {
  const response = await axios.post(`/api/members/signup`, newUser);
  return response;
};

export const addNewStudy = async (newStudy) => {
  const response = await axios.post(`/api/studies`, newStudy);
  return response;
};

export const getStudies = async () => {
  const response = await axios.get("/api/studies");
  return response;
};

export const getStudy = async (id) => {
  const response = await axios.get(`/api/studies/details/${id}`);
  return response.data;
};

export const getUserDetailInfo = async (id) => {
  const response = await axios.get(`/api/members/details/${id}`);
  console.log(response);
  return response.data.data;
};

export const postStudyWish = async (studyId) => {
  const response = await axios.post(`/api/wish/toggle/${studyId}`);
  return response.data;
};

export const postBoard = async ({ id, board }) => {
  const response = await axios.post(`/api/study_boards/${id}`, board);
  return response.data;
};

export const deleteBoard = async (boardId) => {
  const response = await axios.delete(`/api/study_boards/${boardId}`);
  return response.data;
};

export const postStudyRegist = async (studyId) => {
  const response = await axios.post(`/api/study_register/apply/${studyId}`);
  return response.data;
};

export const deleteStudyRegist = async (studyId) => {
  const response = await axios.delete(`/api/study_register/cancel/${studyId}`);
  return response.data;
};

export const deleteStudy = async (studyId) => {
  const response = await axios.delete(`api/studies/${studyId}`);
  return response.data;
};

export const postComment = async (studyBoardId, newComment) => {
    const response = await axios.post(`/api/comments/${studyBoardId}`, newComment);
    return response.data
};

export const getComment = async (studyBoardId) => {
  const response = await axios.get(`/api/comments/${studyBoardId}`);
  return response.data
}

export const postImageUpload = async (data) => {
  const response = await axios.post(`api/studies/file`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
