import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faMagnifyingGlass,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";
import { LogInModalContext } from "../context/LogInModalContext";
import axios from "axios";
function Nav() {
  const { showLogin, setShowLogin } = useContext(LogInModalContext);
  const { user, setUser } = useContext(UserContext);
  let [showDropdown, setShowDropdown] = useState(false);
  let [showAltDropdown, setShowAltDropdown] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const USERNAME_LS = window.localStorage.getItem("USERNAME");
    const USER_ID = window.localStorage.getItem("USER_ID");
    const TOKEN = window.localStorage.getItem("TOKEN");
    const expiry = window.localStorage.getItem("TIMER");
    if (
      USERNAME_LS !== null &&
      USER_ID !== null &&
      TOKEN !== null &&
      expiry !== null &&
      USERNAME_LS !== undefined &&
      USER_ID !== undefined &&
      TOKEN !== undefined &&
      expiry !== undefined
    ) {
      const now = new Date();
      if (now.getTime() > expiry) {
        axios
          .post("https://red-fantastic-agouti.cyclic.app/user/verify-token", {
            token: TOKEN,
          })
          .then((res) => {
            if (res.status === 200) {
              setUser({ username: USERNAME_LS, _id: USER_ID, token: TOKEN });
              const now = new Date();
              let ttl = 86400000;
              let expiry = now.getTime() + ttl;
              window.localStorage.removeItem("TIMER");
              window.localStorage.setItem("TIMER", expiry);
            }
          })
          .catch(function (err) {
            // console.log(err);
            localStorage.clear();
            window.location.href = `https://joeddit.com/`;
          });
      } else if (now.getTime() < expiry) {
        setUser({ username: USERNAME_LS, _id: USER_ID, token: TOKEN });
      }
    } else {
      localStorage.clear();
    }
  }, [setUser]);
  let link;
  if (
    user !== null &&
    user !== undefined &&
    user.username !== null &&
    user.username !== undefined
  ) {
    link = `https://joeddit.com/#/u/${user.username}`;
  }

  function showOptions() {
    setShowDropdown(!showDropdown);
  }
  function showAltOptions() {
    setShowAltDropdown(!showAltDropdown);
  }

  function logout() {
    axios
      .get("https://red-fantastic-agouti.cyclic.app/user/log-out")
      .then((res) => {
        if (res.status === 200) {
          localStorage.clear();
          window.location.href = `https://joeddit.com/`;
        }
      })
      .catch(function (err) {
        localStorage.clear();
        window.location.href = `https://joeddit.com/`;
      });
  }

  function searchData() {
    window.location.href = `https://joeddit.com/#/search/${searchQuery}`;
  }
  const searchInput = React.useRef(null);

  function enterFunc(event) {
    if (document.activeElement === searchInput.current) {
      if (searchQuery.length > 0 && event.key === "Enter") {
        searchData();
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", enterFunc, false);

    return () => {
      document.removeEventListener("keydown", enterFunc, false);
    };
  }, [enterFunc]);
  return (
    <div className="w-full bg-white h-14 flex justify-evenly items-center lg:px-5">
      <div className="md:w-52 font-bold text-xl flex justify-center">
        <a
          href={`${process.env.PUBLIC_URL}/`}
          className="px-2 border border-black mr-1 lg:mr-0"
        >
          <FontAwesomeIcon icon={faHouse} className="mr-1 hidden lg:inline" />
          Joeddit
        </a>
      </div>
      <div className="justify-center flex relative md:w-160 min-w-160 md:mx-auto">
        <input
          type="text"
          placeholder="
          Search Joeddit"
          className="h-10 border rounded-full p-2 pl-6 md:w-full w-52"
          ref={searchInput}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="left-2 top-3 absolute text-[#A2A8B4]"
        />
      </div>
      {/*  rounded border-gray-900/30 border-[1px]  */}
      <div className="flex items-center ml-2">
        {/* here */}
        <button onClick={() => showAltOptions()}>
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            className="text-[#A2A8B4] md:hidden"
          />
        </button>
        {/* testing alt dropdown */}
        {showAltDropdown && (
          <div className="absolute z-50 top-[56px] right-0 bg-white border-gray-900/30 border-x-[2px]">
            {!user || user === null || user === undefined ? (
              <div className="border-b-2 p-2 border-gray-900/30">
                <button onClick={() => setShowLogin(!showLogin)}>Log in</button>
              </div>
            ) : (
              <ul className="rounded-br rounded-bl">
                <a href="/create-post">
                  <li className="p-2 hover:bg-black/20 border-gray-900/30">
                    Create post
                  </li>
                </a>
                <a href={link}>
                  <li className="p-2 hover:bg-black/20 border-gray-900/30 border-t-[2px]">
                    Your page
                  </li>
                </a>
                <a href="/u/settings">
                  <li className="p-2 hover:bg-black/20 border-gray-900/30 border-t-[2px]">
                    Settings
                  </li>
                </a>
                <button onClick={() => logout()} className="w-full flex">
                  <li className="p-2 w-full flex hover:bg-black/20 border-gray-900/30 border-t-[2px] border-b-[2px]">
                    Log out
                  </li>
                </button>
              </ul>
            )}
          </div>
        )}
        {/* testing alt dropdown */}
        <a href="/#/create-post" className="rounded-full hidden md:block">
          <FontAwesomeIcon
            icon={faPlusCircle}
            size="2xl"
            className="left-2 top-3 text-[#A2A8B4] md:pl-2"
          />
        </a>
        <div className="w-32 ml-8 relative hidden md:flex justify-center items-center h-[48.02px]">
          <div className="font-bold flex">
            {user !== null ? (
              <button
                onClick={() => showOptions()}
                className="w-full flex pr-2 justify-center"
              >
                {user.username}
              </button>
            ) : (
              <button
                className="rounded text-white border rounded-full px-3 py-1 bg-red-500"
                onClick={() => {
                  setShowLogin(!showLogin);
                }}
              >
                Log in
              </button>
            )}
          </div>
          {showDropdown && (
            <div className="absolute z-50 top-[51.5px] bg-white w-full border-gray-900/30 border-x-[2px]">
              <ul className="rounded-br rounded-bl">
                <a href="/#/create-post">
                  <li className="p-2 hover:bg-black/20 border-gray-900/30">
                    Create post
                  </li>
                </a>
                <a href={link}>
                  <li className="p-2 hover:bg-black/20 border-gray-900/30 border-t-[2px]">
                    Your page
                  </li>
                </a>
                <a href="/#/u/settings">
                  <li className="p-2 hover:bg-black/20 border-gray-900/30 border-t-[2px]">
                    Settings
                  </li>
                </a>
                <button onClick={() => logout()} className="w-full flex">
                  <li className="p-2 w-full flex hover:bg-black/20 border-gray-900/30 border-t-[2px] border-b-[2px]">
                    Log out
                  </li>
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
