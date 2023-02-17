import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
function Settings() {
  let [activeTab, setActiveTab] = useState(1);
  let [showLastButton, setShowLastButton] = useState(false);
  let [showPwForm, setShowPwForm] = useState(false);
  let [setPw, setSetPw] = useState("");
  let [setPwCheck, setSetPwCheck] = useState("");
  let [notif, setNotif] = useState(false);
  let [showSuccess, setShowSuccess] = useState(false);
  let [emailCheck, setEmailCheck] = useState("");
  let [showEmailSuccess, setShowEmailSuccess] = useState(false);
  let [showEmailForm, setShowEmailForm] = useState(false);
  let [foundUser, setFoundUser] = useState(null);
  let [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      axios
        .get("https://red-fantastic-agouti.cyclic.app/find-user/", {
          headers: { userid: user._id },
        })
        .then((res) => {
          if (res.status === 200) {
            setLoading(false);
            setFoundUser(res.data);
          }
        })
        .catch();
    }
  }, [user]);

  let tabOne = document.getElementById("tab-1");
  let tabTwo = document.getElementById("tab-2");
  function handleTabOne() {
    setActiveTab(1);
    tabOne.classList.add("border-red-500");
    tabTwo.classList.remove("border-red-500");
    tabOne.classList.remove("border-white");
    tabTwo.classList.add("border-white");
  }
  function handleTabTwo() {
    setActiveTab(2);
    tabTwo.classList.add("border-red-500");
    tabOne.classList.remove("border-red-500");
    tabTwo.classList.remove("border-white");
    tabOne.classList.add("border-white");
  }
  function showFinalButton() {
    setShowLastButton(true);
    setTimeout(() => {
      setShowLastButton(false);
    }, 2000);
  }
  function showNotifButton() {
    setNotif(true);
    setTimeout(() => {
      setNotif(false);
    }, 2000);
  }
  function showSuccessButton() {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 10000);
  }
  function showSuccessEmailButton() {
    setShowEmailSuccess(true);
    setTimeout(() => {
      setShowEmailSuccess(false);
    }, 10000);
  }

  let submitPwChange = () => {
    if (setPw !== setPwCheck || setPw.length < 6 || setPwCheck.length < 6) {
      showNotifButton();
    } else {
      axios
        .put("https://red-fantastic-agouti.cyclic.app/update-password", {
          _id: user._id,
          newPw: setPw,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            showSuccessButton();
          }
        })
        .catch();
    }
  };
  let submitEmailChange = () => {
    axios
      .post("https://red-fantastic-agouti.cyclic.app/update-email", {
        userId: user._id,
        newEmail: emailCheck,
      })
      .then((res) => {
        if (res.status === 200) {
          showSuccessEmailButton();
        }
      })
      .catch();
  };
  function deleteAccount() {
    axios
      .post("https://red-fantastic-agouti.cyclic.app/delete-account", {
        userId: user._id,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.clear();
          window.location.href = `https://joeddit.com/`;
        }
      })
      .catch();
  }
  return (
    <div className="border-t-[2px] border-t border-gray-900/30 px-4">
      <div className="sm:max-w-[1200px] mx-auto min-h-[calc(trueMax-2px)]">
        <h1 className="font-medium text-xl mt-2">User settings</h1>
        <div className="flex gap-2 font-bold text-lg mt-8">
          <button
            className="border-b-4 border-red-500"
            id="tab-1"
            onClick={() => handleTabOne()}
          >
            Account info.
          </button>
          <button
            className="border-b-4 border-white"
            id="tab-2"
            onClick={() => handleTabTwo()}
          >
            Delete account
          </button>
        </div>
        {activeTab === 1 && (
          <>
            <h1 className="text-xl font-medium mt-8">Account settings</h1>
            <div className="mt-4 sm:w-160 flex flex-col">
              <div className="flex justify-between">
                <p className="mt-4">Email Address</p>{" "}
                <button
                  onClick={() => setShowEmailForm(!showEmailForm)}
                  className="font-medium text-red-400 border-red-400 border rounded-full py-1 px-4"
                >
                  Change
                </button>
              </div>
              <p className="mt-4 text-gray-900/50 text-sm">
                {!loading ? <>{foundUser.email}</> : <>email@email.com</>}
              </p>
              {showEmailSuccess && (
                <p className="text-green-500">Successfully changed email!</p>
              )}
              {showEmailForm && (
                <div className="rounded m-4 p-4 border border-red-500">
                  <div>
                    <input
                      onChange={(e) => setEmailCheck(e.target.value)}
                      type="email"
                      placeholder="Enter new email"
                      className="border border-black p-2 rounded m-1"
                    />
                    <button
                      className="font-medium bg-red-400 text-white border rounded-full py-1 px-4"
                      onClick={submitEmailChange}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
              <div className="flex justify-between">
                <p className="mt-4">Change password</p>
                <button
                  onClick={() => setShowPwForm(!showPwForm)}
                  className="font-medium text-red-400 border-red-400 border rounded-full py-1 px-4"
                >
                  Change
                </button>
              </div>
              <p className="mt-4 text-gray-900/50 text-sm">
                Password must be at least 6 characters long.
              </p>
              {showSuccess && (
                <p className="text-green-500">Successfully changed password!</p>
              )}
              {showPwForm && (
                <div className="rounded m-4 p-4 border border-red-500">
                  <div>
                    {notif && (
                      <p className="text-red-500">
                        Values must be equal and at least 6 characters.
                      </p>
                    )}
                    <input
                      onChange={(e) => setSetPw(e.target.value)}
                      type="password"
                      placeholder="Enter new password"
                      className="border border-black p-2 rounded m-1"
                    />
                    <input
                      onChange={(e) => setSetPwCheck(e.target.value)}
                      type="password"
                      placeholder="Confirm new password"
                      className="border border-black p-2 rounded m-1"
                    />
                    <button
                      className="font-medium bg-red-400 text-white border rounded-full py-1 px-4"
                      onClick={submitPwChange}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {activeTab === 2 && (
          <>
            <h1 className="text-xl font-medium mt-8 text-red-500">
              Delete Account
            </h1>
            <div className="mt-4 sm:w-160 flex flex-col">
              Are you sure you would like to delete your account?
              <button
                onClick={() => showFinalButton()}
                className="w-fit mt-4 border-red-500 px-6 py-1 text-red-500 border rounded-full"
              >
                Yes
              </button>
              {showLastButton && (
                <button
                  onClick={deleteAccount}
                  className="sm:w-fit mt-4 border-red-500 px-6 py-1 text-red-500 border rounded-full"
                >
                  Really, yes.
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Settings;
