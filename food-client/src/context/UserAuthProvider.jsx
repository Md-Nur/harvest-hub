import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import app from "../firebase/firebase.config";
import axios from "axios";
import { toast } from "react-toastify";

const UserAuthContext = createContext({
  user: {},
  setUser: () => {},
  loading: true,
  setLoading: () => {},
});

export const useUserAuth = () => {
  return useContext(UserAuthContext);
};

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsbuscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      axios
        .post(user ? "/token" : "/logout", user, {
          withCredentials: true,
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    });

    return () => {
      return unsbuscribe();
    };
  }, []);

  return (
    <UserAuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
