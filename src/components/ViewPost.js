import React, { useEffect, useState, useContext } from "react";
import {
  faComment,
  faShare,
  faHeart,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SingleComment from "./SingleComment";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { SignUpModalContext } from "../context/SignUpModalContext";

import SingleCommentSkele from "./SingleCommentSkele";
function ViewPost() {
  let [foundPost, setFoundPost] = useState();
  let [loading, setLoading] = useState(true);
  let [hasImg, setHasImg] = useState(false);
  let [pseudoLikes, setPseudoLikes] = useState(0);
  let [upvoteButtonId, setUpvoteButtonId] = useState(null);
  let [comLink, setComLink] = useState(null);
  let [userLink, setUserLink] = useState(null);
  let [dynamicId, setDynamicId] = useState(null);
  let [shownDate, setShownDate] = useState(null);
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [comments, setComments] = useState([]);
  let [commentsLoading, setCommentsLoading] = useState(true);
  let [postCommentErr, setPostCommentErr] = useState(false);
  let [emptyCommentErr, setEmptyCommentErr] = useState(false);
  // creating comment
  let [commentBody, setCommentBody] = useState(null);
  const { user } = useContext(UserContext);
  const { showSignUp, setShowSignUp } = useContext(SignUpModalContext);

  function postComment() {
    if (
      user !== null &&
      user !== undefined &&
      commentBody !== "" &&
      commentBody !== undefined &&
      commentBody !== null
    ) {
      let currentURL = window.location.href;
      let postId = currentURL.split("/")[4];
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      axios
        .post(
          "http://localhost:8080/create-comment",
          {
            username: user.username,
            commentBody: commentBody,
            parentId: postId,
            userId: user._id,
            originalId: postId,
          },
          config
        )
        .then((res) => {
          // console.log(res);
          if (res.status === 200) {
            //  bring to post
            // window.location.href = `http://localhost:3000/retrieve-post/${res.data._id}`;
            window.location.reload();
          }
        })
        .catch(function () {
          postError();
        });
    } else {
      // YOU CANNOT POST AN EMPTY COMMENT
      emptyError();
    }
  }
  function emptyError() {
    setEmptyCommentErr(true);
    setTimeout(() => {
      setEmptyCommentErr(false);
    }, 3000);
  }
  function postError() {
    setPostCommentErr(true);
    setTimeout(() => {
      setPostCommentErr(false);
    }, 3000);
  }
  useEffect(() => {
    let currentURL = window.location.href;
    let postId = currentURL.split("/")[4];
    axios
      .get("http://localhost:8080/retrieve-post", {
        headers: { clickedPostId: postId },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res);
          setLoading(false);
          setFoundPost(res.data);
          setPseudoLikes(res.data.numLikes);
          setUpvoteButtonId(`button ${res.data._id}`);
          setComLink(`/community/${res.data.community}`);
          setUserLink(`/u/${res.data.postUser}`);
          setDynamicId(`container ${res.data._id}`);
          let originalDate = res.data.dateAdded;
          let edit = originalDate.split(" ");
          setShownDate(edit[0] + " " + edit[1] + " " + edit[2] + " " + edit[3]);
          if (res.data.img) {
            setHasImg(true);
          }
          // console.log(res.data.img);
        }
      })
      .catch();
    // console.log(foundPost);
  }, []);

  useEffect(() => {
    let currentURL = window.location.href;
    let postId = currentURL.split("/")[4];
    axios
      .get("http://localhost:8080/retrieve-comments", {
        headers: { postid: postId },
      })
      .then((res) => {
        if (res.status === 200) {
          setComments(res.data);
          setCommentsLoading(false);
        }
      })
      .catch();
  }, []);

  function deletePost() {
    const headers = {
      Authorization: `Bearer ${user.token}`,
      postId: foundPost._id,
      userId: user._id,
      postUserId: foundPost.postUserId,
    };
    if (user === null || undefined) {
      console.log("not your post");
      return;
    } else if (user._id === foundPost.postUserId) {
      axios
        .delete("http://localhost:8080/delete-post", { headers })
        .then((res) => {
          if (res.status === 200) {
            window.location.href = "http://localhost:3000";
          } else {
            console.log(res);
          }
        })
        .catch();
    }
  }

  function upvote(e) {
    if (foundPost.likedByUsers.includes(user._id)) {
      downvote();
    } else {
      let button = document.getElementById(upvoteButtonId);
      button.classList.add("text-red-600");
      axios
        .post("http://localhost:8080/like-post", {
          userId: user._id,
          postId: foundPost._id,
        })
        .then((res) => {
          if (res.status === 200) {
            // turn upvote orange add one to count
            setPseudoLikes(foundPost.numLikes + 1);
            // console.log("successful upvote");
          } else {
            button.classList.remove("text-red-600");
          }
        })
        .catch();
    }
  }
  function downvote(e) {
    if (!foundPost.likedByUsers.includes(user._id)) {
      upvote();
    } else {
      let button = document.getElementById(upvoteButtonId);
      button.classList.remove("text-red-600");
      axios
        .post("http://localhost:8080/unlike-post", {
          userId: user._id,
          postId: foundPost._id,
        })
        .then((res) => {
          if (res.status === 200) {
            // turn upvote orange add one to count
            setPseudoLikes(foundPost.numLikes - 1);
            // console.log("successful downvote");
          } else {
            button.classList.add("text-red-600");
          }
        })
        .catch();
    }
  }
  useEffect(() => {
    let button = document.getElementById(upvoteButtonId);
    if (
      !loading &&
      foundPost &&
      user !== null &&
      user !== undefined &&
      foundPost.likedByUsers.includes(user._id)
    ) {
      button.classList.add("text-red-600");
    }
  }, [upvoteButtonId]);

  return (
    <div className="min-h-[calc(100vh-55px)] bg-stone-300/50 w-full">
      <div className="text-center bg-red-400 p-4 sm:mb-4 items-center flex flex-col">
        <h1 className="text-3xl text-white grow">
          {!loading && <>j/{foundPost.community}</>}
        </h1>
      </div>
      <div className="flex justify-center pb-4">
        <div className="flex flex-col relative w-full">
          {showDeleteModal && (
            <div className="absolute top-2 left-2 right-2 rounded bg-white z-50 border-red-600 border p-2">
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
          <div className="bg-white md:w-160 sm:border-gray-900/30 sm:border-[1px] sm:rounded">
            <div className="flex sm:p-2 py-4">
              <div className="w-10 flex flex-col items-center rounded-l pr-4 pl-2">
                <button onClick={upvote} id={upvoteButtonId}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                {!loading && <>{pseudoLikes}</>}
                {!loading &&
                  user !== null &&
                  user !== undefined &&
                  foundPost.postUserId === user._id && (
                    <button
                      onClick={() => setShowDeleteModal(!showDeleteModal)}
                      className="text-gray-500 w-full justify-center items-center"
                    >
                      <FontAwesomeIcon icon={faCircleMinus} />
                    </button>
                  )}
              </div>
              <div className="pr-8 w-full">
                <div className="text-gray-500 text-sm">
                  {!loading && (
                    <div className="">
                      <a className="text-black font-medium" href={comLink}>
                        {" "}
                        j/{foundPost.community}
                      </a>{" "}
                      <p className="hidden sm:inline"> Posted by</p>{" "}
                      <a href={userLink}> u/{foundPost.postUser}</a> {shownDate}
                    </div>
                  )}
                  {loading && (
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <p className="animate-pulse">j/community</p>
                        <p className="hidden sm:inline animate-pulse">
                          Posted by
                        </p>
                        <p className="animate-pulse">u/username</p>
                        <p className="animate-pulse">DD MM YYYY</p>
                      </div>
                      <div className="flex flex-col text-gray-500 text-lg">
                        <p className="animate-pulse">Loading title</p>
                        <p className="animate-pulse">Loading body</p>
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xl font-medium">
                  {/* Title */}
                  {!loading && <>{foundPost.postTitle}</>}
                </p>
                {hasImg &&
                  foundPost.img &&
                  foundPost.img !== null &&
                  foundPost.img !== undefined &&
                  foundPost.img !== "this is a test" &&
                  !loading && (
                    <div className="flex justify-center">
                      <img
                        src={`http://localhost:8080/image/${foundPost.img}`}
                        alt="user"
                        className="w-[75vw] sm:w-full"
                        // className="max-h-36"
                      />
                    </div>
                  )}
                <p className="text-lg">
                  {/* Text body */}
                  {!loading && <>{foundPost.postBody}</>}
                </p>
              </div>
              {/* </div> */}
            </div>
            <div className="px-8">
              <div className="flex text-gray-500 font-medium">
                <div className="flex items-center mr-4">
                  <FontAwesomeIcon icon={faComment} className="pr-1" />
                  {!loading && (
                    <>
                      <p>{foundPost.numComments}</p>
                    </>
                  )}
                </div>
                <div className="mx-2">
                  <button>
                    <FontAwesomeIcon icon={faShare} className="pr-1" />
                  </button>
                </div>
              </div>
            </div>
            {/* CREATE POST */}
            <div className="px-8 pt-4">
              <div>
                {user !== null ? (
                  <>
                    <div className="flex font-light">
                      Comment as{" "}
                      <p className="text-red-500 ml-1">{user.username}</p>
                    </div>

                    <textarea
                      onChange={(e) => setCommentBody(e.target.value)}
                      placeholder="Great post!"
                      className="my-2 border-gray-900/30 border-[1px] rounded w-full p-1 h-40"
                    ></textarea>
                    {postCommentErr && (
                      <p className="text-red-500">
                        An Error has occurred, please try again.
                      </p>
                    )}
                    {emptyCommentErr && (
                      <p className="text-red-500">Comment must not be empty</p>
                    )}
                    <button
                      onClick={() => postComment()}
                      className="bg-red-500 rounded-full text-lg px-4 py-1 mb-2 mr-4 text-white justify-self-end"
                    >
                      Post
                    </button>
                  </>
                ) : (
                  <button
                    className="bg-red-500 rounded-full w-max p-1 px-2 text-white"
                    onClick={() => setShowSignUp(!showSignUp)}
                  >
                    Log in to comment
                  </button>
                )}
              </div>
            </div>
            {/* BEGIN COMMENT AREA */}
            <div className="px-8 pt-4 max-w-[637.78px] ">
              {!commentsLoading &&
                comments.map((post) => {
                  return (
                    <SingleComment
                      post={post}
                      key={post._id}
                      // replies={getReplies(post.id)}
                    />
                  );
                })}
              {commentsLoading && (
                <>
                  <SingleCommentSkele />
                  <SingleCommentSkele />
                </>
              )}
              {!commentsLoading && comments.length === 0 && (
                <p className="text-gray-500 text-center">
                  Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="hidden lg:flex relative">
          <div className="h-fit w-60 ml-6 flex flex-col bg-red-400 bg-white mb-4 border-gray-900/30 border-[1px] rounded px-3 py-2">
            <ul>
              <li>Posting Rules</li>
              <li>1. Be cool.</li>
              <li>2. Don't say anything you wouldn't say IRL.</li>
              <li>3. Credit original content.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewPost;
