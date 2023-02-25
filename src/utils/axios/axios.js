import axios from "axios";

export const loginUser = async (loginUser) => {
  const response = await axios.post("", loginUser, {
    withCredentials: true,
  });
  return response.data;
};

// const getIsUser = async () => {
//     const response = await axios.get("/api/users/")
// }

export const addNewUser = async (newUser) => {
  console.log(newUser);
  const response = await axios.post("/api/members/signup", newUser, {
    withCredentials: true,
  });
  return response.data;
};
