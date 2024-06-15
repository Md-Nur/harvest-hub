import { getAuth, signOut } from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        toast.success("logout successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
