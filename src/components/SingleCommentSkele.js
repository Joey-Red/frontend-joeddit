import React from "react";
import {
  faArrowUp,
  faArrowDown,
  faReply,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SingleComment() {
  return (
    <div>
      <div className="flex">
        <a href="#">u/pastaenthusiast</a>
        <p className="text-gray-500 ml-1"> · 3 hr. ago</p>
      </div>
      <div>
        <p className="font-light">
          Other LPT: do not expect to conceive the month you plan. Even when
          everything is going well with fertility there is only about a 20-30%
          chance of conceiving each month and it’s normal to take a number of
          months to conceive, even up to a year (but talk to your doctor at a
          preconception visit for what you personally can expect, I am not a
          doctor and this is not medical advice)
        </p>
      </div>
      <div className="flex justify-center items-center w-fit gap-2 my-2">
        <button className="flex justify-center items-center">
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <p>27</p>
        <button className="flex justify-center items-center">
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <button className="flex justify-center items-center gap-2 text-gray-500">
          <FontAwesomeIcon icon={faComment} />
          <p>Reply</p>
        </button>
      </div>
    </div>
  );
}

export default SingleComment;
