import React, { useState, useEffect, useContext } from "react";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { UserContext } from "../context/UserContext";
function SingleComment(props) {
  let { post } = props;
  let [shownDate, setShownDate] = useState("Mon Feb 06 2023");
  let [userLink, setUserLink] = useState(null);
  let [replies, setReplies] = useState(null);
  let [repliesLoading, setRepliesLoading] = useState(null);
  let [newCommentBody, setNewCommentBody] = useState(null);
  let [showCommentField, setShowCommentField] = useState(false);
  let [upvoteButtonId, setUpvoteButtonId] = useState(null);
  let [pseudoLikes, setPseudoLikes] = useState(0);

  let [postCommentErr, setPostCommentErr] = useState(false);
  let [emptyCommentErr, setEmptyCommentErr] = useState(false);

  const { user } = useContext(UserContext);
  useEffect(() => {
    if (post !== null && post !== undefined) {
      let originalDate = post.dateAdded;
      let edit = originalDate.split(" ");
      setShownDate(edit[1] + " " + edit[2]);
      setUserLink(`https://joeddit.com/#/u/${post?.username}`);
      setPseudoLikes(post.numLikes);
    }
  }, []);

  useEffect(() => {
    if (post !== null && post !== undefined) {
      setUpvoteButtonId(`button ${post._id}`);
      axios
        .get("https://red-fantastic-agouti.cyclic.app/retrieve-comments", {
          headers: { postid: post._id },
        })
        .then((res) => {
          if (res.status === 200) {
            setReplies(res.data);
            setRepliesLoading(false);
            if (post !== null && post !== undefined) {
              let button = document.getElementById(upvoteButtonId);
              if (
                !repliesLoading &&
                post &&
                post.likedByUsers.includes(user._id)
              ) {
                button.classList.add("text-red-600");
              }
            }
          }
        })
        .catch();
    }
  }, [post]);

  function postComment() {
    if (
      user !== null &&
      user !== undefined &&
      newCommentBody !== "" &&
      newCommentBody !== undefined &&
      newCommentBody !== null
    ) {
      let config = {
        headers: {
          Authorization: "Bearer " + user.token,
        },
      };
      let currentURL = window.location.href;
      let originalId = currentURL.split("/")[5];
      axios
        .post(
          "https://red-fantastic-agouti.cyclic.app/create-comment",
          {
            username: user.username,
            commentBody: newCommentBody,
            parentId: post._id,
            userId: user._id,
            originalId: originalId,
          },
          config
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            //  bring to post
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

  // LIKING A COMMENT
  function upvote(e) {
    if (post.likedByUsers.includes(user._id)) {
      downvote();
    } else {
      let button = document.getElementById(upvoteButtonId);
      button.classList.add("text-red-600");
      axios
        .post("https://red-fantastic-agouti.cyclic.app/like-comment", {
          userId: user._id,
          postId: post._id,
        })
        .then((res) => {
          if (res.status === 200) {
            setPseudoLikes(post.numLikes + 1);
          } else {
            button.classList.remove("text-red-600");
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
      button.classList.remove("text-red-600");
      axios
        .post("https://red-fantastic-agouti.cyclic.app/unlike-comment", {
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
          }
        })
        .catch();
    }
  }

  return (
    <div className="border-l pl-1 md:pl-6 flex flex-col border-black/50 mb-2">
      <div className="flex gap-2">
        <a href={userLink}>u/{post?.username}</a>
        <p className="text-gray-500">{shownDate}</p>
        <button
          onClick={() => upvote()}
          id={upvoteButtonId}
          className="flex justify-center items-center"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <p>{pseudoLikes}</p>

        <button
          onClick={() => setShowCommentField(!showCommentField)}
          className="flex justify-center items-center gap-2 text-gray-500"
        >
          <FontAwesomeIcon icon={faComment} />
          <p>Reply</p>
        </button>
      </div>
      <div>
        <p className="font-light">{post?.commentBody}</p>
      </div>
      <div className="flex justify-center items-center w-fit gap-2 my-2">
        {showCommentField && (
          <div className="flex flex-col">
            <div className="flex font-light">
              Comment as <p className="text-red-500 ml-1">{user.username}</p>
            </div>
            <textarea
              onChange={(e) => setNewCommentBody(e.target.value)}
              placeholder="That sure was interesting."
              className="my-2 border-gray-900/30 border-[1px] rounded w-full p-1"
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
              className="bg-red-500 rounded-full text-lg px-4 py-1 mb-2 mr-4 text-white justify-self-end w-min"
            >
              Post
            </button>
          </div>
        )}
        {replies !== undefined && replies !== null && replies.length > 0 && (
          <div className="flex flex-col">
            {replies.map((reply) => (
              <SingleComment post={reply} key={reply._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleComment;
