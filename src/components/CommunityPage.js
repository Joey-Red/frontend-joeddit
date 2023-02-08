import React, { useState, useEffect } from "react";
import PostSkeleton from "./PostSkeleton";
import SideFeed from "./SideFeed";
import StandardPost from "./StandardPost";
import axios from "axios";

function CommunityPage() {
  const [loading, setLoading] = useState(true);
  const [foundPosts, setFoundPosts] = useState([]);
  useEffect(() => {
    let currentURL = window.location.href;
    let postId = currentURL.split("/")[4];
    axios
      .get("http://localhost:8080/retrieve-community-posts", {
        headers: { community: postId },
      })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          setFoundPosts(res.data);
        }
      })
      .catch();
  }, []);
  return (
    <div className="">
      <div className="flex justify-center sm:px-6 sm:py-4 bg-stone-300/50 min-h-trueMax">
        <div className="flex flex-col">
          {foundPosts.map((post) => {
            return <StandardPost post={post} key={post._id} />;
          })}
        </div>
        <div className="hidden lg:flex relative">
          <SideFeed />
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;
