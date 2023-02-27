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
  const response = await axios.get(`/api/studies/${id}`);
  return response.data;
};
