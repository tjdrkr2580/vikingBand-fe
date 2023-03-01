import axios from "axios";

axios.defaults.withCredentials = true;

export const loginUser = async (User) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/members/login`,
    User
  );
  return response;
};

export const addNewUser = async (newUser) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/members/signup`,
    newUser
  );
  return response;
};

export const addNewStudy = async (newStudy) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/studies`,
    newStudy
  );
  return response;
};

export const getStudies = async () => {
  const response = await axios.get(
    "http://viking-band.chit-chat.shop/api/studies"
  );
  return response;
};

export const getStudy = async (id) => {
  const response = await axios.get(
    `http://viking-band.chit-chat.shop/api/studies/details/${id}`
  );
  return response.data;
};

export const getUserDetailInfo = async (id) => {
  const response = await axios.get(
    `http://viking-band.chit-chat.shop/api/members/details/${id}`
  );
  console.log("됨" + response);
  return response?.data.data;
};

export const postStudyWish = async (studyId) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/wish/toggle/${studyId}`
  );
  return response.data;
};

export const postBoard = async ({ id, data }) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/study_boards/${id}`,
    data
  );
  return response.data;
};
export const postStudyRegist = async (studyId) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/study_register/apply/${studyId}`
  );
  return response.data;
};

export const deleteStudyRegist = async (studyId) => {
  const response = await axios.delete(
    `http://viking-band.chit-chat.shop/api/study_register/cancel/${studyId}`
  );
  return response.data;
};

export const deleteStudy = async (studyId) => {
  const response = await axios.delete(
    `http://viking-band.chit-chat.shop/api/studies/${studyId}`
  );
  return response.data;
};

export const postImageUpload = async (data) => {
  const response = await axios.post(
    `http://viking-band.chit-chat.shop/api/studies/file`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
