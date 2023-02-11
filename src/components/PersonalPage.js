import React, { useState, useEffect, useContext } from "react";
import StandardPost from "./StandardPost";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import StandardPostSkele from "./StandardPostSkele";
import PinnedPost from "./PinnedPost";
function PersonalPage() {
  const [loading, setLoading] = useState(true);
  const [foundPosts, setFoundPosts] = useState([]);
  const [showField, setShowField] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [userId, setUserId] = useState(null);
  const [fetchPosts, setFetchedPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [fetchLoaded, setFetchLoaded] = useState(false);

  useEffect(() => {
    let currentURL = window.location.href;
    let userId = currentURL.split("/")[4];
    setUserId(userId);
    axios
      .get("http://localhost:8080/u/", {
        headers: { user: userId },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setFoundPosts(res.data);
        }
      })
      .catch();
  }, []);

  useEffect(() => {
    let currentURL = window.location.href;
    let userId = currentURL.split("/")[4];
    axios
      .get("http://localhost:8080/retrieve-personal-posts", {
        headers: { user: userId },
      })
      .then((res) => {
        if (res.status === 200) {
          setFetchLoaded(true);
          setFetchedPosts(res.data);
        }
      })
      .catch();
  }, []);

  function showInputField() {
    setShowField(true);
  }

  function submitNewPost(e) {
    if (newPin !== null) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .post(
          "http://localhost:8080/personal-post",
          {
            username: user.username,
            postBody: newPin,
            postUserId: user._id,
          },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            setShowField(false);
          }
        })
        .catch();
    }
  }
  return (
    <div className="">
      <div className="flex justify-center sm:px-6 sm:py-4 bg-stone-300/50 min-h-trueMax">
        <div className="flex flex-col">
          {!loading &&
            foundPosts.map((post) => {
              return <StandardPost post={post} key={post._id} />;
            })}
          {loading && (
            <>
              <StandardPostSkele />
              <StandardPostSkele />
              <StandardPostSkele />
              <StandardPostSkele />
            </>
          )}
          {!loading && (
            <p className="text-gray-500 text-center">
              This is the end of {userId}'s posts for now.
            </p>
          )}
        </div>
        <div className="hidden lg:flex relative">
          <div className="w-80 ml-6 flex flex-col">
            <div className="text-lg bg-white mb-4 border-gray-900/30 border-[1px] flex w-full rounded px-3 py-2 text-center">
              <FontAwesomeIcon
                icon={faThumbTack}
                className="rotate-45 mr-auto"
              />
              {userId}'s pinned posts
              <FontAwesomeIcon
                icon={faThumbTack}
                className="rotate-45 ml-auto"
              />
            </div>
            {!fetchLoaded && (
              <div className="flex flex-col">
                <div className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2">
                  Loading...
                  <button className="absolute top-1 right-2 text-red-500"></button>
                </div>
                <div className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2">
                  Loading...
                  <button className="absolute top-1 right-2 text-red-500"></button>
                </div>
                <div className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2">
                  Loading...
                  <button className="absolute top-1 right-2 text-red-500"></button>
                </div>
                <div className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2">
                  Loading...
                  <button className="absolute top-1 right-2 text-red-500"></button>
                </div>
                <div className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2">
                  Loading...
                  <button className="absolute top-1 right-2 text-red-500"></button>
                </div>
              </div>
            )}
            {fetchLoaded &&
              fetchPosts.map((post) => {
                return <PinnedPost key={post._id} post={post} />;
              })}
            {fetchLoaded && fetchPosts.length === 0 && (
              <div>
                {!loading && userId !== null && userId !== undefined && (
                  <p className="text-gray-500 text-center mb-4">
                    {userId} has no pinned posts.
                  </p>
                )}
              </div>
            )}
            {user !== null &&
              user !== undefined &&
              user &&
              !loading &&
              foundPosts.length !== 0 &&
              user._id === foundPosts[0].postUserId && (
                <>
                  {!showField && (
                    <button
                      onClick={() => showInputField()}
                      className="border-red-400 border rounded-full text-white text-lg bg-red-400"
                    >
                      Add a pinned post.
                    </button>
                  )}
                  {showField && (
                    <div className="w-full">
                      <textarea
                        className="p-2 rounded border-gray-900/30 border-[1px] w-full"
                        type="text"
                        placeholder="Hi, I'm anon and I like dogs."
                        onChange={(e) => setNewPin(e.target.value)}
                      />
                      <button
                        onClick={() => submitNewPost()}
                        className="ml-auto flex px-2 py-1 border-red-400 border rounded-full text-white text-lg bg-red-400"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalPage;
