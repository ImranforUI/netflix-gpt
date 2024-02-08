import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate('/')
      }
    });

    // Unsubscribe When the component unmounts
    return () => unsubscribe();
  }, []); 
  return (
    <div className="absolute flex justify-between items-center px-4 w-screen py-1 bg-gradient-to-b from-black z-10 ">
      <img
        src={LOGO}
        className="w-44"
        alt="logo"
      />
      {user && (
        <div className="flex items-center ">
          <img
            className="w-10 h-10 rounded-lg mr-1"
            alt="userIcon"
            src={user?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="font-bold text-xs text-white py-1 px-2 rounded-lg"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
