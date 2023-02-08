import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

function Contact() {
  const [showNotif, setShowNotif] = useState(false);
  const [showLiNotif, setShowLiNotif] = useState(false);
  function copyEmail() {
    setShowNotif(true);
    navigator.clipboard.writeText("jdalrymple.business@gmail.com");
    setTimeout(() => {
      setShowNotif(false);
    }, 3000);
  }
  function copyLinkedIn() {
    setShowLiNotif(true);
    navigator.clipboard.writeText("https://www.linkedin.com/in/joey-dalrymple");
    setTimeout(() => {
      setShowLiNotif(false);
    }, 3000);
  }
  return (
    <div className="h-trueMax flex justify-center">
      <div className="flex flex-col mt-8">
        <div className="border-gray-900/30 border-[1px] rounded p-8">
          <h1 className="text-3xl font-medium">Contact Information</h1>
          <ul>
            <li className="flex items-center">
              <h2 className="text-2xl">jdalrymple.business@gmail.com</h2>
              {!showNotif ? (
                <button
                  onClick={() => {
                    copyEmail();
                  }}
                  className="rounded-full border border-red-500 text-red-500 p-2 m-2"
                >
                  Copy email
                </button>
              ) : (
                // 526.23
                // 525.47
                <p className="rounded-full border border-green-500 text-green-500 py-2 px-[12.38px] m-2">
                  Copied <FontAwesomeIcon icon={faCheck} />
                </p>
              )}
            </li>
          </ul>
          <div className="text-lg">
            <p>If you would like to contact me, please include:</p>
            <ul>
              <li>1. The reason you are contacting me.</li>
              <li>2. What your name is, who you are.</li>
              <li>3. Your question/inquiry.</li>
            </ul>
          </div>
          <div className="flex items-center">
            <h2 className="text-2xl">Connect on LinkedIn</h2>
            {!showLiNotif ? (
              <button
                onClick={() => {
                  copyLinkedIn();
                }}
                className="rounded-full border border-red-500 text-red-500  p-2 m-2"
              >
                Copy LinkedIn
              </button>
            ) : (
              <p className="rounded-full border border-green-500 text-green-500   p-2 px-3 m-2">
                Copied <FontAwesomeIcon icon={faCheck} />
              </p>
            )}
          </div>
          <a href="/" className="underline">
            Go back home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
