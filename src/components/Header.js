import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANG } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { languageSelector } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe When the component unmounts
    return () => unsubscribe();
  }, []);

  const handleGptSearchHanle = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(languageSelector(e.target.value));
  };
  return (
    <div className="absolute flex justify-between items-center px-4 w-screen py-1 bg-gradient-to-b from-black z-10 ">
      <img src={LOGO} className="w-44" alt="logo" />
      {user && (
        <div className="flex items-center ">
          {showGptSearch && (
            <select
              onChange={handleLanguageChange}
              className="bg-gray-800 text-white py-1 px-3 rounded-lg mx-2"
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifire} value={lang.identifire}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={handleGptSearchHanle}
            className="bg-gray-300 text-black py-1 px-3 rounded-lg mx-2"
          >
            {showGptSearch ? "HomePage" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 rounded-lg mr-1"
            alt="userIcon"
            src={user?.photoURL}
          />
          <svg
            onClick={handleSignOut}
            class="h-8 w-8 text-red-500 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
          {/* <button
            onClick={handleSignOut}
            className="font-bold text-xs text-white py-1 px-2 rounded-lg"
          >
            (Sign Out)
          </button> */}
        </div>
      )}
    </div>
  );
};

export default Header;
