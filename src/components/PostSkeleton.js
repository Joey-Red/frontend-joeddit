import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faArrowDown,
  faComment,
  faShare,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
function PostSkeleton() {
  return (
    <div className="cursor-pointer">
      <div className="w-160 bg-white mb-2.5 flex rounded border-[1px] border-l-0 border-gray-900/30 cursor-pointer">
        <div className="w-10 bg-red-400 px-1 flex flex-col items-center rounded-l py-2 border-l-[1px] border-gray-900/30">
          <button className="w-6 flex justify-center">
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
          <p>0</p>
          <button className="w-6 flex justify-center">
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        </div>
        <div>
          <div className="text-gray-500 mb-2 mx-2 pt-2">
            <p>j/community Posted by u/user DDMMYYYY</p>
          </div>
          <p className="mx-2 font-bold text-lg">Title</p>
          <div className="px-2 pt-1 pb-2.5">Body ...</div>
          <div className="w-full pl-1 pr-2 flex text-gray-800/70">
            <button className="p-2 mr-1 flex items-center">
              <FontAwesomeIcon icon={faComment} className="mr-1.5" />
              <p>0</p>
            </button>
            <button className="p-2 mr-1 flex items-center">
              <FontAwesomeIcon icon={faShare} className="mr-1.5" />
              <p>Share</p>
            </button>
            <button className="p-2 mr-1 flex items-center">
              <FontAwesomeIcon icon={faCircleMinus} className="mr-1.5" />
              <p>Remove</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSkeleton;
