import React, { useState } from "react";
import "antd/dist/antd.css";
import "./style.css";
import { Modal, Button, Input, message } from "antd";
import config from "../../config";

const { TextArea } = Input;

//Feedback success messages. Edit these to display different messages depending the success of the feedback form submit.

function successMsg() {
  //Displays on feedback success
  message.success("Thanks for your feedback!");
}

function errorMsg() {
  //Displays on feedback error
  message.error("An error occured. Please try again.");
}

//Sets whether or not the modal is visable
export default function FeedbackModal() {
  //Gets the video id from the url
  let url = window.location.href; //gets the whole url
  let split = url.split("/"); //splits the url into an array by /
  let ref = split[split.length - 1]; //Collects the last part of the array, which in this case will be the video id that is displaying on this page
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [feedback, setFeedback] = useState("");
  //Posts the feedback to the database
  function postFeedback(value) {
    if (!value.videoId) {
      errorMsg();
    } else {
      //Value is the feedback to be submitted
      fetch(`${config.BACKEND_URL_FEEDBACK_UPDATE}`, {
        //Change this url on deployment
        method: "post",
        body: JSON.stringify({
          videoId: value.videoId, //Taken from ref - see feedbackToSubmit below
          feedback: value.feedback,
        }),
        headers: { "Content-Type": "application/json" },
        //Validation: ContentType
      })
        .then((res) => res.json()) //res.json() is an async function
        .then((data) => {
          setFeedback(""); //Resets the form

          setIsModalVisible(false); //closes the modal
          successMsg(); //message confirming to the user that the feedback has gone through
        })
        .catch((error) => {
          errorMsg(); //message alerting user that there has been an error and they may need to try again
        }); //uncaught promise rejection. The promise throws and error and I need to catch otherwise it will be thrown into the ether
    }
  }

  //This function changes the feedback state to whatever is inserted into the feedback textbox onChange
  function handleChange(e) {
    // e.preventDefault();
    if (e.target.id === "feedback") {
      setFeedback(e.target.value);
    }
  }

  //handleSubmit takes the feedback state, and the video id (from params; see "ref" above) and posts it to postFeedback as an object
  function handleSubmit(e) {
    e.preventDefault();
    const feedbackToSubmit = {
      videoId: ref,
      feedback: feedback,
    };
    postFeedback(feedbackToSubmit);
  }
  const showModal = () => {
    //Sets modal visibility to true
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    //Sets modal visibility to false, used if the user has pressed cancel
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Give Feedback
      </Button>
      <Modal
        title="Give Feedback on this lecture"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div>
          <div id="feedback-form-container">
            <form>
              <TextArea
                id="feedback"
                placeholder="Insert Feedback"
                value={feedback}
                onChange={handleChange}
              />
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
