import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
  withCredentials: true,
});

export async function followApi(username) {
  try {
    const response = await api.post(`/follow/${username}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function unFollowApi(username) {
  try {
    const response = await api.post(`/unfollow/${username}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function sendFollowRequest(username) {
  try {
    const response = await api.post(`/followrequest/send/${username}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function acceptFollowRequest(username) {
  try {
    const response = await api.put(`/followrequest/accept/${username}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function rejectFollowRequest(username) {
  try {
    const response = await api.put(`/followrequest/reject/${username}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}

export async function getPendingRequestsApi() {
  try {
    const response = await api.get(`/followrequest/pending`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}