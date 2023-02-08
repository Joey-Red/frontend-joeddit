import React from "react";

function CommunityButton(props) {
  let { com, setCommunity, setShowCommunities, setCommunityChosen } = props;
  return (
    <button
      className="flex hover:bg-black/20 p-1"
      onClick={() => {
        setCommunity(com.communityName);
        setShowCommunities(false);
        setCommunityChosen(true);
      }}
    >
      {com.communityName}
    </button>
  );
}

export default CommunityButton;
