import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login,logOutApi,register } from "../services/auth.api.js";


export function useAuth() {

  // this line write call to AuthContext
    const context = useContext(AuthContext)

    const {user , setUser , loading ,setLoading}=context

      const handleLogin = async (username, password) => {
        setLoading(true);

        try {
          const response = await login(username, password);

          if (response.token) {
            localStorage.setItem("token", response.token);
          }

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

          if (response.token) {
            localStorage.setItem("token", response.token);
          }

          setUser(response.user);
          return response;
          
        } catch (error) {
          return error.response?.data || error.message;
        } finally {
          setLoading(false);
        }
  };
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      
      const response = await logOutApi()
      
      // Frontend ke storage se data uda do
      localStorage.removeItem("token");
      localStorage.removeItem("user"); 

      return response.data
      
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      setLoading(false);
    }
  };
    
    return ({user,loading,handleLogin,handleRegister,handleLogout})
}