import { faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import coffeeAsset from "../assets/coffee-asset.jpg";
function SideFeed() {
  return (
    <div className="w-80 ml-6 flex flex-col">
      <div className="text-lg bg-white mb-4 border-gray-900/30 border-[1px] rounded px-3 py-2">
        <FontAwesomeIcon icon={faThumbTack} className="rotate-45 mr-1" />
        Welcome to Joeddit, have fun.
        <FontAwesomeIcon icon={faThumbTack} className="rotate-45 ml-1" />
      </div>
      <div className="bg-white mb-4 border-gray-900/30 border-[1px] rounded px-3 py-2">
        <p className="text-lg ">
          Click here to create a post and or a community for others to enjoy?
        </p>

        <a
          href="/#/create-post"
          className="flex justify-center items-center text-center"
        >
          <div className="w-full bg-red-400 text-white px-2 py-1 my-1 rounded-full">
            Create Post
          </div>
        </a>
      </div>
      <a
        href="/#/contact"
        className="cursor-pointer bg-white mb-4 border-gray-900/30 border-[1px] rounded px-3 py-2 sticky top-2"
      >
        <img src={coffeeAsset} className="" alt="ad" />
        <p className="text-lg">This is not a real ad, but it could be.</p>
      </a>
    </div>
  );
}

export default SideFeed;
