import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/UserContext";

import axios from "axios";
function PinnedPost(props) {
  let { post } = props;
  const { user } = useContext(UserContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hidePost, setHidePost] = useState(false);
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
        .delete(
          "https://red-fantastic-agouti.cyclic.app/delete-personal-post",
          { headers }
        )
        .then((res) => {
          if (res.status === 200) {
            setHidePost(true);
          } else {
            console.log(res);
          }
        })
        .catch();
    }
  }
  return (
    <>
      {!hidePost && (
        <div
          key={post._id}
          className="relative text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded pl-3 pr-5 py-2"
        >
          {post.postBody}
          <button
            onClick={() => setShowDeleteModal(!showDeleteModal)}
            className="absolute top-1 right-2 text-red-500"
          >
            <FontAwesomeIcon icon={faCircleMinus} />
          </button>
          {showDeleteModal && (
            <div className="absolute bg-white top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-4">
              <p>Are you sure?</p>
              <button
                onClick={() => deletePost()}
                className="hover:bg-red-600 hover:text-white text-center text-lg text-red-600 border-red-600 border rounded-full w-12"
              >
                Yes
              </button>
              <button
                onClick={() => setShowDeleteModal(!showDeleteModal)}
                className="hover:bg-green-600 hover:text-white text-center text-lg text-green-600 border-green-600 border rounded-full w-12"
              >
                No
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default PinnedPost;
