import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useUserAuth } from "../context/UserAuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
const GooglePopUpBtn = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  const { setUser, setLoading } = useUserAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const user = result.user;
        setUser(user);
        setLoading(false);
        toast.success(`Sign in successful ${user.displayName}`);
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <button
      onClick={handleClick}
      className="btn btn-warning text-center"
    >
      Sign in with Google
    </button>
  );
};

export default GooglePopUpBtn;
