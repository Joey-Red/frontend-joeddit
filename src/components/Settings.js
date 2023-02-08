import React, { useState } from "react";

function Settings() {
  let [activeTab, setActiveTab] = useState(1);
  let [showLastButton, setShowLastButton] = useState(false);
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
                <button className="font-medium text-red-400 border-red-400 border rounded-full py-1 px-4">
                  Change
                </button>
              </div>
              <p className="mt-4 text-gray-900/50 text-sm">email@email.com</p>
              <div className="flex justify-between">
                <p className="mt-4">Change password</p>
                <button className="font-medium text-red-400 border-red-400 border rounded-full py-1 px-4">
                  Change
                </button>
              </div>
              <p className="mt-4 text-gray-900/50 text-sm">
                Password must be at least 6 characters long.
              </p>
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
                <button className="sm:w-fit mt-4 border-red-500 px-6 py-1 text-red-500 border rounded-full">
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
