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

export const AuthContext = React.createContext("");
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currUser) => {
      console.log("curr user >> ", currUser);
      setUser(currUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

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
