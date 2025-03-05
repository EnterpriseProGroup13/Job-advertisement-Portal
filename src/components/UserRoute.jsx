import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Redirect to login if user is not logged in
  return user ? children : <Navigate to="/login" />;
};

export default UserRoute;
