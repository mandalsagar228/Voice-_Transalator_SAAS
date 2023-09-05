import { createContext, useContext } from "react";
export const authContext = createContext();

const useAuth = () => {
  return useContext(authContext);
};
export default useAuth;
