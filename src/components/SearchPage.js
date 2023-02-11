import React, { useEffect, useState } from "react";
import axios from "axios";
import StandardPostSkeleton from "./StandardPostSkele";
import StandardPost from "./StandardPost";
function SearchPage() {
  let [searchQuery, setSearchQuery] = useState(null);
  let [foundPosts, setFoundPosts] = useState([]);
  let [loading, setLoading] = useState(true);
  let [noPosts, setNoPosts] = useState(false);
  useEffect(() => {
    let currentURL = window.location.href;
    let query = currentURL.split("/")[4];
    let newQuery;
    if (query.includes("%")) {
      newQuery = query.replace(/%20/g, " ");
      setSearchQuery(newQuery);
    } else {
      setSearchQuery(query);
    }
    // console.log(newQuery);
    if (searchQuery !== null) {
      axios
        .get("http://localhost:8080/search/:query", {
          headers: { searchquery: searchQuery },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setFoundPosts(res.data);
            if (res.data.length === 0) {
              setNoPosts(true);
            }
            setLoading(false);
          }
        })
        .catch(function () {
          console.log("err");
        });
    }
  }, [searchQuery]);

  return (
    <div className="flex flex-col mx-auto w-full h-trueMax items-center">
      {!loading && (
        <p className="text-gray-500 my-2">Search results for {searchQuery}</p>
      )}
      {!loading &&
        foundPosts.length > 0 &&
        foundPosts.map((post) => {
          return <StandardPost post={post} key={post._id} />;
        })}
      {loading && (
        <>
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
          <StandardPostSkeleton />
        </>
      )}
      {noPosts && (
        <p className="text-gray-500 text-center">
          No posts were found, please try another query.
        </p>
      )}
    </div>
  );
}

export default SearchPage;
