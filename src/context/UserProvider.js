import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import UserController from "../controller/UserController";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const unsetUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const login = async (email, password) => {
    try {
      const token = await UserController.login(email, password);
      localStorage.setItem("token", token);
      setToken(token); 

      const userDetails = await UserController.getUserDetails(token);
      setUser({ id: userDetails._id, isAdmin: userDetails.isAdmin });
      localStorage.setItem("userData", JSON.stringify(userDetails));
      
      return { token, user: userDetails };
    } catch (error) {
      unsetUser();
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await UserController.register(userData);
      setUser(response);
    } catch (err) {
      setError(err.message);
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await UserController.forgotPassword(email);
      console.log("Password reset email sent successfully.");
    } catch (error) {
      setError(error.message);
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
        if (token) {
            try {
                const response = await UserController.getUserDetails(token);
                setUser(response);
                localStorage.setItem("user", JSON.stringify(response));
                console.log("User details fetched successfully", response);
                setLoading(false);
            }
            catch (err) {
                setError(err.message);
                console.error("Error fetching user details:", err);
                
            }
            finally {
                setLoading(false);
            }

        }
    }
    fetchUser();
  }, [token]);


    return (
        <UserContext.Provider
        value={{
            user,
            loading,
            error,
            token,
            login,
            register,
            forgotPassword,
            unsetUser,
        }}
        >
        {children}
        </UserContext.Provider>
    );


}
