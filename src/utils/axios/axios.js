import axios from "axios";

const API_BASE_URL = "http://viking-band.chit-chat.shop";

export const loginUser = async (User) => {
  const response = await axios.post(`${API_BASE_URL}/api/members/login`, User, {
    withCredentials: true,
  });
  return response;
};

// const getIsUser = async () => {
//     const response = await axios.get("/api/users/")
// }

export const addNewUser = async (newUser) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/members/signup`,
    newUser
  );
  return response;
};

export const addNewStudy = async (newStudy) => {
  const response = await axios.post(`${API_BASE_URL}/api/studies`, newStudy);
  return response;
};
