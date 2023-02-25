import axios from "axios";

const API_BASE_URL = "http://viking-band.chit-chat.shop";

export const loginUser = async (User) => {
  console.log(loginUser)
  const response = await axios.post(`${API_BASE_URL}/api/members/login`, User, {
    withCredentials: true,
  });
  return response.data;
};

// const getIsUser = async () => {
//     const response = await axios.get("/api/users/")
// }

export const addNewUser = async (newUser) => {
  console.log(newUser);
  const response = await axios.post(`${API_BASE_URL}/api/members/signup`, newUser, {
    withCredentials: true,
  });
  return response.data;
};
