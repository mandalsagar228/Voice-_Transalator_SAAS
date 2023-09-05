import { useState } from "react";
import PropTypes from "prop-types";
import { authContext } from "../Hooks/useAuth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const Login = (user) => {
    setUser(user);
  };
  const Logout = () => {
    setUser(null);
  };
  return (
    <authContext.Provider value={{ user, Login, Logout }}>
      {children}
    </authContext.Provider>
  );
};

// Add PropTypes validation for the children prop
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
