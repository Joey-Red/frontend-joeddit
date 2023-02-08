import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleMinus,
  faComment,
  faHeart,
  faShare,
} from "@fortawesome/free-solid-svg-icons";

function StandardPostSkele() {
  return (
    <>
      <div className="animate-pulse md:w-160 relative w-[100vw] sm:px-4">
        <div className="flex bg-white sm:mb-2.5 sm:rounded border-[1px] sm:border-l-0 border-gray-900/30">
          <div className="hidden sm:flex  w-10 bg-black/5 px-1 flex flex-col items-center rounded-l py-2 border-l-[1px] border-gray-900/30">
            <button className="w-6 flex justify-center">
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <p>1</p>
          </div>
          {/*  flex flex-col w-full */}
          <div className="">
            <div className="text-gray-500 mb-2 mx-2 pt-2">
              <div className="flex gap-4">
                <p className="text-black font-medium"> j/community</p>{" "}
                <p className="hidden sm:inline"> Posted by</p>{" "}
                <p> u/username</p> Mon June 6 2006
              </div>
            </div>
            <div className="w-full">
              <div className="max-h-32 overflow-hidden">
                <div className="relative">
                  <p className="mx-2 font-bold text-lg">Loading title..</p>
                </div>
                <div className="px-2 pt-1 pb-2.5 relative">
                  <p>Loading post...</p>
                </div>
              </div>
            </div>
            <div className="w-full pl-1 pr-2 flex text-gray-800/70">
              <div className="sm:hidden flex justify-center items-center pr-2">
                <button className="w-6 flex justify-center">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <p>1</p>
              </div>
              <button className=" p-2 mr-1 flex items-center">
                <FontAwesomeIcon icon={faComment} className=" mr-1.5" />
                <p>0</p>
              </button>
              <button className=" p-2 mr-1 flex items-center">
                <FontAwesomeIcon icon={faShare} className=" mr-1.5" />
                <p>Share</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StandardPostSkele;
