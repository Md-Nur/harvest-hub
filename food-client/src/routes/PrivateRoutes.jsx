import { Navigate, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthProvider";
import { toast } from "react-toastify";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useUserAuth();
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-infinity loading-lg"></span>;
  }
  if (!user) {
    toast.dismiss();
    toast.error("You need to login to access this page");
    return <Navigate to="/login" state={location.pathname} />;
  }
  return children;
};

export default PrivateRoutes;
