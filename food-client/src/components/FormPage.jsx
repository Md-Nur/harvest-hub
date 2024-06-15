import Lottie from "lottie-react";
import foodJson from "../assets/food.json";
import { useUserAuth } from "../context/UserAuthProvider";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const FormPage = ({ children, title, data }) => {
  const { setLoading, setUser } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const auth = getAuth(app);

    if (title === "Register") {
      const passwordRegex = /(?=.*[a-z])(?=.*[A-Z]).{6,}/;

      if (!passwordRegex.test(data.password)) {
        toast.error(
          "Password must be at least 6 characters long and contain at least one uppercase & lowercase letter"
        );
        return;
      }

      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: data.name,
            photoURL: data.photoURL,
          })
            .then(() => {
              setUser({
                ...user,
                displayName: data.name,
                photoURL: data.photoURL,
              });
              toast.success(`Welcome ${user.displayName}`);
              navigate(location?.state || "/");
            })
            .catch((e) => {
              toast.error(e.message);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } else if (title === "Login") {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setUser(user);
          toast.success(`Welcome ${user.displayName}`);
          navigate(location?.state || "/");
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (title === "Add Food") {
      const addLoad = toast.loading("Adding Food");
      axios
        .post("/add-food", data)
        .then(() => {
          toast.dismiss(addLoad);
          toast.success("Food added successfully");
        })
        .catch((error) => {
          toast.dismiss(addLoad);
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (title === "Contact Us") {
      const contactLoad = toast.loading("Sending Message");
      axios
        .post("/contact-us", data)
        .then(() => {
          toast.dismiss(contactLoad);
          toast.success("Message sent successfully");
        })
        .catch((error) => {
          toast.dismiss(contactLoad);
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>Harvest Hub | {title === "Contact Us" ? "Home" : title}</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">{title}</h1>
            <Lottie animationData={foodJson} className="w-auto h-96" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              {children}
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  value={title}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPage;
