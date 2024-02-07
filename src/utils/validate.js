export const checkValidateData = (email, password, name) => {
  // const isNameValid = /^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(name);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);

    if (!isEmailValid) return "Email Id is not valid";
    if (!isPasswordValid) return "Password is not valid";
    // if (!isNameValid) return "Name is not valid";

  return null;
};
