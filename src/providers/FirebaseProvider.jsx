import React from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = React.createContext("");
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currUser) => {
      // console.log("curr user >> ", currUser);
      setUser(currUser);
      try {
        if (currUser) {
          const userInfo = { uid: currUser.uid };
          const res = await axiosPublic.post("jwt", userInfo);
          if (res.data.token)
            localStorage.setItem("access-token", res.data.token);
          userInfo.name = currUser.displayName;
          userInfo.email = currUser.email;
          userInfo.image = currUser.photoURL;
          userInfo.role = "user";
          // const resUser =
          await axiosPublic.post("users", userInfo);
          // console.log(resUser.data.message);
        } else {
          localStorage.removeItem("access-token");
        }
      } catch (error) {
        // console.log(error);
      }
      setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosPublic]);

  const createUserWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateProfileInfo = (name, url) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: url,
    });
  };

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    createUserWithGoogle,
    updateProfileInfo,
    logIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
