  import axios from "axios";

  const api = axios.create({
    baseURL: "http://localhost:3000/api/post",
    withCredentials: true,
  });

  export async function getFeed() {
    try {
      const response = await api.get("/feed");
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }

  export async function likePost(postid) {
    try {
      const response = await api.post(`/like/${postid}`);
      return response.data;
    } catch (error) {
      return error.response?.data || error.message;
    }
  }


  export async function createPost(formData) {
    try {
      const response = await api.post("/createpost", formData, {
        headers: {
          "Content-Type":"multipart/form-data"
        },  
      })
      return response.data
    }
    catch (error) {
      return error.response?.data || error.message
    }
  }