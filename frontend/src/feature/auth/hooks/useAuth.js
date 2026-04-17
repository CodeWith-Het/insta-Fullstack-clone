import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,register } from "../services/auth.api.js";


export function useAuth() {
    const context = useContext(AuthContext)

    const {user , setUser , loading ,setLoading}=context

      const handleLogin = async (username, password) => {
        setLoading(true);

        try {
          const response = await login(username, password);
          setUser(response.user);
          return response;
        } catch (error) {
          return error.response?.data || error.message;
        } finally {
          setLoading(false);
        }
      };

      const handleRegister = async (username, email, password) => {
        setLoading(true);
        try {
          const response = await register(username, email, password);
          setUser(response.user);
          return response;
        } catch (error) {
          return error.response?.data || error.message;
        } finally {
          setLoading(false);
        }
    };
    
    return ({user,setUser,handleLogin,handleRegister})
}