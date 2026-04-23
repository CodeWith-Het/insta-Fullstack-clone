import { useContext } from "react";
import { TroggleFollowContext } from "../toggleFollow.context";
import {
  acceptFollowRequest,
  followApi,
  rejectFollowRequest,
  sendFollowRequest,
  unFollowApi,
  getPendingRequestsApi
} from "../service/toggleFollow.api";

export function useFollow() {
  const context = useContext(TroggleFollowContext);
  const { follow, setFollow, unfollow, setUnFollow, loading, setLoading } =
    context;

  const handleFollow = async (username) => {
    setLoading(true);
    try {
      const response = await followApi(username);
      setFollow(response.follow);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async (username) => {
    setLoading(true);
    try {
      const response = await unFollowApi(username);
      setUnFollow(response.unfollow);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptFollowRequest = async (username) => {
    setLoading(true);
    try {
      const response = await acceptFollowRequest(username);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const handleRejectFollowRequest = async (username) => {
    setLoading(true);
    try {
      const response = await rejectFollowRequest(username);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const handleSendFollowRequest = async (username) => {
    setLoading(true);
    try {
      const response = await sendFollowRequest(username);
      return response;
    } catch (error) {
      return error.response?.data || error.message;
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingRequests = async () => {
    setLoading(true);
    try {
      const response = await getPendingRequestsApi();
      return response; // Component ko data de dega
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFollow,
    handleUnFollow,
    handleAcceptFollowRequest,
    handleRejectFollowRequest,
    handleSendFollowRequest,
    fetchPendingRequests,
    loading
  };
}
