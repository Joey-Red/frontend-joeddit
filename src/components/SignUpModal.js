import React, { useContext, useState } from "react";
import { LogInModalContext } from "../context/LogInModalContext";
import { SignUpModalContext } from "../context/SignUpModalContext";

import axios from "axios";
import { TempLoginPw } from "../context/TempLoginPwContext";
import { TempLoginUN } from "../context/TempLoginUNContext";

function SignUpModal() {
  const { showLogin, setShowLogin } = useContext(LogInModalContext);
  const { showSignUp, setShowSignUp } = useContext(SignUpModalContext);
  const { setTempPw } = useContext(TempLoginPw);
  const { setTempUN } = useContext(TempLoginUN);
  let [usernameSU, setUsernameSU] = useState("");
  let [passwordSU, setPasswordSU] = useState("");
  let [passwordConfirmSU, setPasswordConfirmSU] = useState("");
  let [emailSU, setEmailSU] = useState("");
  let [showErr, setShowErr] = useState(false);
  let signUpCall = () => {
    if (
      passwordSU === passwordConfirmSU &&
      emailSU !== "" &&
      emailSU !== null &&
      emailSU !== undefined
    ) {
      axios
        .post("http://localhost:8080/user/sign-up", {
          username: usernameSU,
          password: passwordSU,
          email: emailSU,
        })
        .then((res) => {
          if (res.status === 200) {
            setShowLogin(true);
            setShowSignUp(false);
            setTempUN(JSON.parse(res.config.data).username);
            setTempPw(JSON.parse(res.config.data).password);
          }
        })
        .catch();
    } else {
      setShowErr(true);
      setTimeout(() => {
        setShowErr(false);
      }, 3000);
    }
  };

  return (
    <div
      id="sign-up-bg"
      onClick={(e) => {
        if (e.target.id === "sign-up-bg") {
          setShowSignUp(!showSignUp);
        }
      }}
      className="z-50 bg-black/20 h-full w-full fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
    >
      <div className="shadow-lg shadow-black/70 z-50 justify-center items-center bg-white lg:w-1/3 max-w-[400px] rounded p-16">
        <h3 className="text-xl font-medium my-2">Create an Account</h3>
        <p className="text-gray-700 text-sm my-2">Sign up today!</p>
        <form>
          <input
            type="text"
            placeholder="Email"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            onChange={(e) => setEmailSU(e.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            onChange={(e) => setUsernameSU(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            autoComplete="new password"
            onChange={(e) => setPasswordSU(e.target.value)}
          />
          {showErr && (
            <p className="text-red-500 text-xl font-bold">
              Passwords must match.
            </p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            autoComplete="confirm password"
            onChange={(e) => setPasswordConfirmSU(e.target.value)}
          />
        </form>
        <button
          onClick={signUpCall}
          className="w-full bg-red-500 rounded-full flex justify-center items-center border text-white py-2 my-2"
        >
          Sign up
        </button>
        <p className="font-light">
          Already on Joeddit?{" "}
          <button
            onClick={() => {
              setShowLogin(!showLogin);
              setShowSignUp(!showSignUp);
            }}
            className="underline text-blue-600"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUpModal;
