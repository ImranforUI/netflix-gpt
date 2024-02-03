import React from "react";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9134db96-10d6-4a64-a619-a21da22f8999/a449fabb-05e4-4c8a-b062-b0bec7d03085/IN-en-20240115-trifectadaily-perspective_alpha_website_medium.jpg"
          alt="background-img"
        />
      </div>
      <form className="w-3/12 bg-black text-white absolute p-12 mx-auto right-0 left-0 my-40 rounded-lg bg-opacity-80">
        <h1 className="font-bold text-3xl py-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 my-3  rounded-lg w-full bg-gray-700"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-3 my-3 rounded-lg w-full bg-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 my-3 rounded-lg w-full bg-gray-700"
        />
        <button className="w-full bg-red-700 p-2 my-5 rounded-lg">
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
