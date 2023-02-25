import axios from "axios";

export const loginUser = async () => {
    const response = await axios.post("")
    return response.data
}

// const getIsUser = async () => {
//     const response = await axios.get("/api/users/")
// }

export const addNewUser = async (newUser) => {
    console.log(newUser)
    const response = await axios.post("http://viking-band.chit-chat.shop/api/members/signup", newUser,{
        withCredentials : true
    })
    return response.data
}

