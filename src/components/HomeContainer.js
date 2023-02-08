import React, { useContext, useEffect, useState } from "react";
import StandardPost from "./StandardPost";
import SideFeed from "./SideFeed";
import { LogInModalContext } from "../context/LogInModalContext";
import { SignUpModalContext } from "../context/SignUpModalContext";
import axios from "axios";
import StandardPostSkeleton from "./StandardPostSkele";
// import StandardPostTESTING from "./StandardPostTESTING";
function HomeContainer() {
  let [fetchPosts, setFetchedPosts] = useState([]);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8080/retrieve-posts", {})
      .then((res) => {
        if (res.status === 200) {
          setFetchedPosts(res.data);
          setLoading(false);
        }
      })
      .catch();
  }, []);

  const { showLogin, setShowLogin } = useContext(LogInModalContext);
  const { showSignUp, setShowSignUp } = useContext(SignUpModalContext);
  useEffect(() => {
    let toggle = document.getElementById("toggle");
    if (showLogin || showSignUp) {
      toggle.classList.add("max-h-trueMax", "overflow-hidden");
    } else if (toggle.classList.contains("max-h-trueMax", "overflow-hidden")) {
      toggle.classList.remove("max-h-trueMax", "overflow-hidden");
    }
  }, [showLogin, setShowLogin, showSignUp, setShowSignUp]);

  return (
    <div id="toggle">
      <div className="flex justify-center sm:px-6 sm:py-4 bg-stone-300/50  min-h-trueMax">
        <div className="flex flex-col">
          {/*  */}
          {/* w-160 */}
          <button className="overflow-hidden md:w-160 relative sm:mb-4 bg-white sm:rounded p-2 h-14 flex justify-center items-center">
            <a
              href="/create-post"
              className="text-xl text-white z-10 sm:rounded p-1 bg-red-400 top-0 left-0 right-0 bottom-0 absolute flex justify-center items-center border-gray-900/30 border-[1px]"
            >
              Create a Post & Join the Conversation
            </a>
          </button>
          {!loading &&
            fetchPosts.map((post) => {
              return <StandardPost post={post} key={post._id} />;
            })}
          {loading && (
            <>
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
              <StandardPostSkeleton />
            </>
          )}
        </div>
        <div className="hidden lg:flex relative">
          <SideFeed />
        </div>
      </div>
    </div>
  );
}

export default HomeContainer;
