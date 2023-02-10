import React, { useContext, useState, useEffect } from "react";
import { LogInModalContext } from "../context/LogInModalContext";
import { SignUpModalContext } from "../context/SignUpModalContext";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { TempLoginPw } from "../context/TempLoginPwContext";
import { TempLoginUN } from "../context/TempLoginUNContext";
function LogInModal() {
  const { showLogin, setShowLogin } = useContext(LogInModalContext);
  const { showSignUp, setShowSignUp } = useContext(SignUpModalContext);
  const { user, setUser } = useContext(UserContext);
  const { tempPw } = useContext(TempLoginPw);
  const { tempUN } = useContext(TempLoginUN);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [errMsg, setErrMsg] = useState(false);

  function showErr() {
    setErrMsg(true);
    setTimeout(() => {
      setErrMsg(false);
    }, 5000);
  }
  useEffect(() => {
    if (
      tempPw !== null &&
      tempPw !== undefined &&
      tempPw !== "" &&
      tempUN !== null &&
      tempUN !== undefined &&
      tempUN !== ""
    ) {
      axios
        .post("http://localhost:8080/user/log-in", {
          // username: "Admin",
          // password: "12",
          username: tempUN,
          password: tempPw,
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data.user, res.data.token);
            setShowLogin(!showLogin);
            window.localStorage.setItem("USERNAME", res.data.user.username);
            window.localStorage.setItem("USER_ID", res.data.user._id);
            window.localStorage.setItem("TOKEN", res.data.token);
            const now = new Date();
            let ttl = 86400000;
            let expiry = now.getTime() + ttl;
            window.localStorage.setItem("TIMER", expiry);
          }
        })
        .catch();
    }
  }, [tempPw, tempUN]);

  let logInCall = () => {
    axios
      .post("http://localhost:8080/user/log-in", {
        // username: "Admin",
        // password: "12",
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data.user, res.data.token);
          setShowLogin(!showLogin);
          window.localStorage.setItem("USERNAME", res.data.user.username);
          window.localStorage.setItem("USER_ID", res.data.user._id);
          window.localStorage.setItem("TOKEN", res.data.token);
          const now = new Date();
          let ttl = 86400000;
          let expiry = now.getTime() + ttl;
          window.localStorage.setItem("TIMER", expiry);
        }
      })
      .catch(function () {
        showErr();
      });
  };

  return (
    <div
      id="bg"
      onClick={(e) => {
        if (e.target.id === "bg") {
          setShowLogin(!showLogin);
        }
      }}
      className="z-50 bg-black/20 h-full w-full fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center"
    >
      <div className="shadow-lg shadow-black/70 z-50 justify-center items-center bg-white lg:w-1/3 max-w-[400px] rounded p-16">
        <h3 className="text-xl font-medium my-2">Log In</h3>
        <p className="text-gray-700 text-sm my-2">
          Log in, create posts and have fun.
        </p>
        {errMsg && (
          <p className="text-red-500">Username or password is incorrect.</p>
        )}
        <form>
          <input
            autoComplete="username"
            type="text"
            placeholder="Username"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            autoComplete="current-password"
            type="password"
            placeholder="Password"
            className="border-gray-900/30 border-[1px] rounded-full p-2 my-2 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
        {/* <div className="font-light">
          Forget your{" "}
          <a href="/forgot-username" className="text-blue-600 underline">
            username
          </a>{" "}
          or{" "}
          <a href="/forgot-password" className="text-blue-600 underline">
            password
          </a>
          ?
        </div> */}
        <button
          onClick={() => logInCall()}
          className="w-full bg-red-500 rounded-full flex justify-center items-center border text-white py-2 my-2"
        >
          Log in
        </button>
        <p className="font-light">
          New to Joeddit?{" "}
          <button
            onClick={() => {
              setShowLogin(!showLogin);
              setShowSignUp(!showSignUp);
            }}
            className="underline text-blue-600"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LogInModal;
