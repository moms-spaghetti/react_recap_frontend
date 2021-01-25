import React, { useState, useEffect } from "react";
import config from "../../config";
import "./style.css";
import moment from "moment";
import { Comment, Divider } from "antd";

export default function FeedbackViewer() {
  let url = window.location.href; //gets the whole url
  let split = url.split("/"); //splits the url into an array by /
  let ref = split[split.length - 1]; //Collects the last part of the array, which in this case will be the video id that is displaying on this page

  const [feedbackArr, setFeedbackArr] = useState([]);

  useEffect(() => {
    async function getFeedback() {
      const response = await fetch(config.BACKEND_URL_FEEDBACK_UPDATE + ref);
      const data = await response.json();
      setFeedbackArr(data.payload);
    }
    getFeedback();
  }, []);

  if (feedbackArr.length > 0) {
    return (
      <div className="feedback-viewer-column">
        {feedbackArr.map((item) => {
          return (
            <Comment
              author={moment(item.created_at).format("DD MM yy hh:mma")}
              content={item.feedback}
            />
          );
        })}
      </div>
    );
  } else {
    return <></>;
  }
}
