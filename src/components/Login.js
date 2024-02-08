import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { checkValidateData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleBtnClick = () => {
    //  validation Login Here
    const message = checkValidateData(
      email.current.value,
      password.current.value
      // name.current.value
    );
    setErrorMessage(message);

    if (message) return;
    if (!isSignInForm) {
      // Sign Up Api Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Sined up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    } else {
      // Sign In Here
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(`${errorCode} - ${errorMessage}`);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BACKGROUND_IMAGE}
          alt="background-img"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-3/12 bg-black text-white absolute p-12 mx-auto right-0 left-0 my-40 rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-3 my-3  rounded-lg w-full bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-3 my-3 rounded-lg w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-3 my-3 rounded-lg w-full bg-gray-700"
        />

        <p className="font-bold text-red-700">{errMessage}</p>
        <button
          onClick={handleBtnClick}
          className="w-full bg-red-700 p-2 my-5 rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered, Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
