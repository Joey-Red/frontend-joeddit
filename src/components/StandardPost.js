import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faCircleMinus,
  faComment,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

function StandardPost(props) {
  let { post } = props;
  let [pseudoLikes, setPseudoLikes] = useState(post.numLikes);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [postDeleted, setPostDeleted] = useState(false);
  let originalDate = post.dateAdded;
  let edit = originalDate.split(" ");
  const { user, setUser } = useContext(UserContext);
  let shownDate = edit[0] + " " + edit[1] + " " + edit[2] + " " + edit[3];
  let upvoteButtonId = `button ${post._id}`;
  let upvoteButtonId2 = `button2 ${post._id}`;
  const link = `http://localhost:3000/retrieve-post/${post._id}`;
  function upvote(e) {
    if (post.likedByUsers.includes(user._id)) {
      downvote();
    } else {
      let button = document.getElementById(upvoteButtonId);
      let button2 = document.getElementById(upvoteButtonId2);
      button.classList.add("text-red-600");
      button2.classList.add("text-red-600");
      axios
        .post("http://localhost:8080/like-post", {
          userId: user._id,
          postId: post._id,
        })
        .then((res) => {
          if (res.status === 200) {
            // turn upvote orange add one to count

            setPseudoLikes(post.numLikes + 1);
            // console.log("successful upvote");
          } else {
            button.classList.remove("text-red-600");
            button2.classList.remove("text-red-600");
          }
        })
        .catch();
    }
  }
  function downvote(e) {
    if (!post.likedByUsers.includes(user._id)) {
      upvote();
    } else {
      let button = document.getElementById(upvoteButtonId);
      let button2 = document.getElementById(upvoteButtonId2);
      button.classList.remove("text-red-600");
      button2.classList.remove("text-red-600");
      axios
        .post("http://localhost:8080/unlike-post", {
          userId: user._id,
          postId: post._id,
        })
        .then((res) => {
          if (res.status === 200) {
            // turn upvote orange add one to count
            setPseudoLikes(post.numLikes - 1);
            // console.log("successful downvote");
          } else {
            button.classList.add("text-red-600");
            button2.classList.add("text-red-600");
          }
        })
        .catch();
    }
  }
  let dynamicId = `container ${post._id}`;
  useEffect(() => {
    let container = document.getElementById(dynamicId);
    if (post.img) {
      if (container.classList.contains("max-h-32")) {
        container.classList.add("max-h-64");
        container.classList.remove("max-h-32");
      }
    }
    // }, [dynamicId, post.img]);
  }, []);

  useEffect(() => {
    if (user && user !== undefined && user !== null) {
      let button = document.getElementById(upvoteButtonId);
      let button2 = document.getElementById(upvoteButtonId2);
      if (post.likedByUsers.includes(user._id)) {
        button.classList.add("text-red-600");
        button2.classList.add("text-red-600");
      }
    }
    // }, [post.likedByUsers, upvoteButtonId, upvoteButtonId2, user]);
  }, []);

  let comLink = `/community/${post.community}`;
  let userLink = `/u/${post.postUser}`;
  function deletePost() {
    const headers = {
      Authorization: `Bearer ${user.token}`,
      postId: post._id,
      userId: user._id,
      postUserId: post.postUserId,
    };
    if (user === null || undefined) {
      console.log("not your post");
      return;
    } else if (user._id === post.postUserId) {
      axios
        .delete("http://localhost:8080/delete-post", { headers })
        .then((res) => {
          if (res.status === 200) {
            // post was successfully deleted
            setPostDeleted(true);
            // console.log(res);
          } else {
            console.log(res);
          }
        })
        .catch();
    }
  }

  return (
    <>
      {!postDeleted && (
        <div className="md:w-160 relative">
          {showDeleteModal && (
            <div className="absolute top-[34px] bottom-[40px] sm:bottom-[50.98px] rounded left-[1px] sm:left-[39.16px] right-[1px] bg-white z-50">
              <div className="items-center justify-center w-full h-full flex flex-col">
                <p className="text-center text-xl font-bold">
                  Are you sure you want to delete this post?
                </p>
                <div className="gap-4 flex mt-2">
                  <button
                    onClick={() => deletePost()}
                    className="hover:bg-red-600 hover:text-white text-center text-lg text-red-600 border-red-600 border rounded-full p-2 w-24"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowDeleteModal(!showDeleteModal)}
                    className="hover:bg-green-600 hover:text-white text-center text-lg text-green-600 border-green-600 border rounded-full p-2 w-24"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex bg-white sm:mb-2.5 sm:rounded border-[1px] sm:border-l-0 border-gray-900/30">
            <div className="hidden sm:flex  w-10 bg-black/5 px-1 flex flex-col items-center rounded-l py-2 border-l-[1px] border-gray-900/30">
              <button
                onClick={(e) => upvote(e)}
                className="w-6 flex justify-center"
                id={upvoteButtonId}
              >
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <p>{pseudoLikes}</p>
            </div>
            <div className="w-full">
              <div className="text-gray-500 mb-2 mx-2 pt-2">
                <div>
                  <a className="text-black font-medium" href={comLink}>
                    {" "}
                    j/{post.community}
                  </a>{" "}
                  <p className="hidden sm:inline"> Posted by</p>{" "}
                  <a href={userLink}> u/{post.postUser}</a> {shownDate}
                </div>
              </div>
              <a href={link} className="w-full">
                <div id={dynamicId} className="max-h-32 overflow-hidden">
                  <div className="relative">
                    <p className="mx-2 font-bold text-lg">{post.postTitle}</p>
                  </div>
                  {post.img &&
                    post.img !== null &&
                    post.img !== undefined &&
                    post.img !== "this is a test" && (
                      <div className="flex justify-center">
                        <img
                          src={`http://localhost:8080/image/${post.img}`}
                          alt="user"
                          className="max-h-52"
                        />
                      </div>
                    )}
                  <div className="px-2 pt-1 pb-2.5 relative">
                    {post.postTitle !== null &&
                      post.postTitle !== undefined &&
                      post.postTitle.length < 200 && <p>{post.postBody}</p>}

                    {post.postTitle === null ||
                      (post.postTitle === undefined && <p>{post.postBody}</p>)}

                    {post.postBody.length > 350 && (
                      <div className="bg-white/80 absolute bottom-0 h-8 w-full"></div>
                    )}
                  </div>
                </div>
              </a>
              <div className="w-full pl-1 pr-2 flex text-gray-800/70">
                <div className="sm:hidden flex justify-center items-center pr-2">
                  <button
                    onClick={(e) => upvote(e)}
                    className="w-6 flex justify-center"
                    id={upvoteButtonId2}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <p>{pseudoLikes}</p>
                </div>
                <button className=" p-2 mr-1 flex items-center">
                  <FontAwesomeIcon icon={faComment} className=" mr-1.5" />
                  <p>{post.numComments}</p>
                </button>
                <button className=" p-2 mr-1 flex items-center">
                  <FontAwesomeIcon icon={faShare} className=" mr-1.5" />
                  <p>Share</p>
                </button>
                {user !== null &&
                  user !== undefined &&
                  post.postUserId === user._id && (
                    <button
                      onClick={() => setShowDeleteModal(!showDeleteModal)}
                      className=" p-2 mr-1 flex items-center"
                    >
                      <FontAwesomeIcon
                        icon={faCircleMinus}
                        className=" mr-1.5"
                      />
                      <p>Remove</p>
                    </button>
                  )}
              </div>
            </div>
            {/* </a> */}
          </div>
        </div>
      )}
    </>
  );
}

export default StandardPost;
