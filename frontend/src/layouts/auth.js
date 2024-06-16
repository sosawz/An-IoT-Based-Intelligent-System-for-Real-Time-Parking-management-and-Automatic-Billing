// auth.js
import { useNavigate } from "react-router-dom";

export const useSignOut = () => {
  const navigate = useNavigate();
  
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return signOut;
};