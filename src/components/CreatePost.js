import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import CommunityButton from "../small-components/CommunityButton";
function CreatePost() {
  const { user, setUser } = useContext(UserContext);

  let [showCommunities, setShowCommunities] = useState(false);
  let [title, setTitle] = useState(null);
  let [body, setBody] = useState(null);
  let [community, setCommunity] = useState(null);
  let [newCommunity, setNewCommunity] = useState(false);
  let [newCommunityName, setNewCommunityName] = useState(null);
  let [alreadyExists, setAlreadyExists] = useState(false);
  let [fetchedComs, setFetchedComs] = useState([]);
  let [communityChosen, setCommunityChosen] = useState(false);

  // IMAGE STUFF
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);

  // Show Err's
  let [errUploadingFile, setErrUploadingFile] = useState(false);
  let [subError, setSubError] = useState(false);
  let [errCreatingPost, setErrCreatingPost] = useState(false);
  let [communityErr, setCommunityErr] = useState(false);
  let [bodyErr, setBodyErr] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8080/retrieve-communities", {})
      .then((res) => {
        if (res.status === 200) {
          setFetchedComs(res.data);
        }
      })
      .catch();
  }, [showCommunities]);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  function createPost() {
    setPosting(true);
    if (community === null || undefined) {
      chooseCommunity();
      setPosting(false);
    }
    if (body === null || undefined) {
      addBody();
      setPosting(false);
    }
    if (file) {
      if (community !== null && body !== null && title !== null) {
        const fd = new FormData();
        let dynamicVar;
        fd.append("image", file, file.name);
        let config = {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        };
        axios
          .post(`http://localhost:8080/upload`, fd, {
            onUploadProgress: (ProgressEvent) => {},
          })
          .then(({ data }) => {
            dynamicVar = data;
            setFile(null);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status === 400) {
              const errMsg = err.response.data;
              if (errMsg) {
                // console.log(errMsg);
                // alert(errMsg);
                setErrUploadingFile(true);
                setPosting(false);
              }
            } else {
              console.log("other error", err);
            }
          })
          .then(() => {
            axios
              .post(
                "http://localhost:8080/create-post",
                {
                  username: user.username,
                  postTitle: title,
                  postBody: body,
                  community: community,
                  postUserId: user._id,
                  img: dynamicVar,
                },
                config
              )
              .then((res) => {
                // console.log("image ran");
                console.log(res);
                if (res.status === 200) {
                  // console.log("image success");
                  window.location.href = `http://localhost:3000/retrieve-post/${res.data._id}`;
                }
              })
              .catch(function () {
                setErrCreatingPost(true);
                setPosting(false);
              });
          });
      }
    } else {
      if (community !== null && body !== null && title !== null) {
        let config = {
          headers: {
            Authorization: "Bearer " + user.token,
          },
        };
        axios
          .post(
            "http://localhost:8080/create-post",
            {
              username: user.username,
              postTitle: title,
              postBody: body,
              community: community,
              postUserId: user._id,
            },
            config
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              //  bring to post
              window.location.href = `http://localhost:3000/retrieve-post/${res.data._id}`;
            }
          })
          .catch(function () {
            setErrCreatingPost(true);
            setPosting(false);
          });
      }
    }
  }
  function handleCommunity(e) {
    setNewCommunityName(e.target.value);
    setCommunity(e.target.value);
  }
  function duplicateSub() {
    setAlreadyExists(true);
    setTimeout(() => {
      setAlreadyExists(false);
    }, 3000);
  }
  function chooseCommunity() {
    setCommunityErr(true);
    setTimeout(() => {
      setCommunityErr(false);
    }, 3000);
  }
  function addBody() {
    setBodyErr(true);
    setTimeout(() => {
      setBodyErr(false);
    }, 3000);
  }
  function attemptCreateCommunity() {
    let config = {
      headers: {
        Authorization: "Bearer " + user.token,
      },
    };
    axios
      .post(
        "http://localhost:8080/create-community",
        {
          community: newCommunityName,
          moderators: user._id,
        },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          setShowCommunities(false);
          if (res.data === "Err 11000") {
            duplicateSub();
          }
        }
      })
      .catch(function () {
        setSubError(true);
      });
  }
  function handleChangeComs() {
    setCommunity(null);
    setShowCommunities(true);
    setCommunityChosen(false);
  }

  return (
    // 87.99px
    <div className="min-h-[calc(100vh-56px)] px-6 py-4 bg-stone-300/50">
      <div className="flex justify-center">
        <div className="flex flex-col relative">
          <div className="sm:w-160">
            <h1 className="text-xl p-4 mb-4 border-b border-white">
              Create Post
            </h1>
            {!communityChosen ? (
              <div
                onClick={() => setShowCommunities(!showCommunities)}
                className="cursor-pointer bg-white sm:w-80 flex justify-between h-12 border-gray-900/30 border-[1px] rounded items-center px-2"
              >
                {subError && (
                  <p className="text-red-500">An error has occurred.</p>
                )}
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faCircleNotch} className="p-1" />
                  Choose a community
                </p>
                <FontAwesomeIcon icon={faChevronDown} className="p-1" />
              </div>
            ) : (
              <div className="bg-white p-2 rounded">
                {community}{" "}
                <button
                  onClick={() => handleChangeComs()}
                  className="bg-red-400 rounded px-2 py-1"
                >
                  Change
                </button>
              </div>
            )}
          </div>
          {alreadyExists && (
            <div className="absolute rounded sm:w-80 top-[71.98px] bg-red-500 p-2 text-white my-2">
              Community already exists.
            </div>
          )}
          {showCommunities && (
            <div className="absolute top-[119.97px] rounded-b bg-white sm:w-80 border-gray-900/30 border-[1px] ">
              <ul className="p-2">
                {newCommunity ? (
                  <div className="flex">
                    <input
                      className="sm:w-[200px] mr-1"
                      type="text"
                      placeholder="Community name"
                      onChange={(e) => handleCommunity(e)}
                    ></input>{" "}
                    <button
                      // disabled={attemptCreate}
                      onClick={() => attemptCreateCommunity()}
                      className="bg-red-500 rounded-full text-white px-2 py-1"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setNewCommunity(true)}
                    className="text-red-500 underline px-1 hover:bg-black/20"
                  >
                    Create new
                  </button>
                )}
                <div className="flex flex-col justify-start max-h-[200px] overflow-y-scroll">
                  {fetchedComs.map((com) => {
                    return (
                      <CommunityButton
                        com={com}
                        key={com._id}
                        setCommunity={setCommunity}
                        setShowCommunities={setShowCommunities}
                        setCommunityChosen={setCommunityChosen}
                      />
                    );
                  })}
                </div>
              </ul>
            </div>
          )}
          <div className="bg-white sm:w-160 border-gray-900/30 border-[1px] rounded mt-4">
            <div className="px-4 pt-4">
              <input
                type="text"
                placeholder="Title"
                className=" border-gray-900/30 border-[1px] rounded w-full p-1"
                onChange={(e) => setTitle(e.target.value)}
              />
              <div>
                <textarea
                  placeholder="Text"
                  className="my-2 border-gray-900/30 border-[1px] rounded w-full p-1 h-40"
                  onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <div className="flex flex-col w-min bg-black/20 p-2 rounded">
                  <label htmlFor="file">Add image</label>
                  <input onChange={handleFile} type="file" name="file" />
                </div>
              </div>
            </div>
            <div className="sm:w-full flex justify-end">
              {errCreatingPost && (
                <p className="text-red-500 my-auto vertical-align pr-2">
                  Error creating post, please try again in a moment.
                </p>
              )}
              {errUploadingFile && (
                <p className="text-red-500 my-auto vertical-align pr-2">
                  Error uploading file, please try again in a moment.
                </p>
              )}
              {bodyErr && (
                <p className="text-red-500 my-auto vertical-align pr-2">
                  Title and body must not be empty.
                </p>
              )}

              {communityErr && (
                <p className="text-red-500 my-auto vertical-align pr-2">
                  You must choose a community.
                </p>
              )}
              {!posting ? (
                <button
                  onClick={() => createPost()}
                  className="bg-red-500 rounded-full text-lg px-4 py-1 mb-2 mr-4 text-white justify-self-end"
                >
                  Post
                </button>
              ) : (
                <button className="animated-pulse grayscale bg-red-500 rounded-full text-lg px-4 py-1 mb-2 mr-4 text-white justify-self-end">
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="hidden h-fit sm:w-60 ml-6 sm:flex sm:flex-col bg-red-400 bg-white mb-4 border-gray-900/30 border-[1px] rounded px-3 py-2">
          <ul>
            <li>Posting Rules</li>
            <li>1. Be cool.</li>
            <li>2. Don't say anything you wouldn't say IRL.</li>
            <li>3. Credit original content.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
