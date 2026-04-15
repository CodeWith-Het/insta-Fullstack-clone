import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials:true
})

export async function register(username,email,password) {
  try
  {
    const respone = await api.post("/register",{username,email,password}
    )
    return respone.data
  } catch (error) {
    const err = error.respone?.data || error.message;
    throw err
  }
}

export async function login(username, password) {
  try {
    const respone = await api.post("/login", {
      username,
      password
    })
    return respone
   }
  catch (error) {
    const err = error.respone?.data || error.message
    throw err
  }
}

export async function getLoginData() {
  try {
    const respone = await api.get("/getLoginData");
    return respone
  }
  catch (error) {
    const err = error.respone?.data || error.message
    throw err
  }
}