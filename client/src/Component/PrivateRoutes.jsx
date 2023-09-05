import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();

  const auth = useAuth();
  if (!auth.user) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
