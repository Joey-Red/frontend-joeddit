import React from "react";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SingleComment() {
  return (
    <div className="animate-pulse border-l pl-1 md:pl-6 flex flex-col border-black/50 mb-2">
      <div className="flex gap-2">
        <p className="animate-pulse">u/username</p>
        <p className="text-gray-500">MM DD YYYY</p>
        <button className="flex justify-center items-center">
          <FontAwesomeIcon icon={faHeart} />
        </button>
        <p className="animate-pulse">0</p>
        <button className="flex justify-center items-center gap-2 text-gray-500">
          <FontAwesomeIcon icon={faComment} />
          <p className="animate-pulse">Reply</p>
        </button>
      </div>
      <div>
        <p className="font-light">
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
          posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel,
          ullamcorper sit amet ligula. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Praesent sapien massa, convallis a pellentesque nec,
          egestas non nisi.
        </p>
      </div>
    </div>
  );
}

export default SingleComment;
