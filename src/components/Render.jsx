import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import timeCalc from "../utils/timeCalc.js";
import upvote from "../assets/upvote.svg";
import downvote from "../assets/downvote.svg";
import {
  signinChecker,
} from "../state/atoms.jsx";

const Render = () => {
  const auth = localStorage.getItem("auth");
  const signedIn = useRecoilValue(signinChecker);
  const [answer, setAnswer] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [single, setSingle] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://stack-bc.vercel.app/send/${id}`);
        setSingle(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  async function voteup() {
    if(!user){
alert("You need to be signed in to vote");
    }
    else{
    const user_id = user.id;
    const updatedDownvotes = single.downvote ? single.downvote.filter((item) => item !== user_id) : [];

    if (!single.upvote || !single.upvote.includes(user_id)) {
      const updatedUpvotes = [...(single.upvote || []), user_id];

      const send = {
        upvote: updatedUpvotes,
        downvote: updatedDownvotes,
      };

      try {
        const response = await axios.post("https://stack-bc.vercel.app/api/vote", send, {
          headers: {
            auth,
            question_id: id,
          },
        });

        if (response.status === 200) {
          setSingle((prev) => ({
            ...prev,
            upvote: updatedUpvotes,
            downvote: updatedDownvotes,
          }));
        }
      } catch (error) {
        console.error("Vote up error:", error);
      }
    }
    }
  }

  async function votedown() {
      if(!user){
alert("You need to be signed in to vote");
    }
    else{
    const user_id = user.id;
    const updatedUpvotes = single.upvote ? single.upvote.filter((item) => item !== user_id) : [];

    if (!single.downvote || !single.downvote.includes(user_id)) {
      const updatedDownvotes = [...(single.downvote || []), user_id];

      const send = {
        downvote: updatedDownvotes,
        upvote: updatedUpvotes,
      };

      try {
        const response = await axios.post("https://stack-bc.vercel.app/api/vote", send, {
          headers: {
            auth,
            question_id: id,
          },
        });

        if (response.status === 200) {
          setSingle((prev) => ({
            ...prev,
            upvote: updatedUpvotes,
            downvote: updatedDownvotes,
          }));
        }
      } catch (error) {
        console.error("Vote down error:", error);
      }
    }
    }
  }

  const navigate = useNavigate();

  async function postAnswer() {
    if (!signedIn) {
      alert("Signin before submitting an answer");
      return;
    }

    try {
      const response = await axios.post(
        "https://stack-bc.vercel.app/api/answer",
        {
          id: single.id,
          answer: answer,
        },
        {
          headers: { auth },
        }
      );
      if (response.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  }

  async function questionDelete() {
    try {
      await axios.get(
        "https://stack-bc.vercel.app/api/delete/question",
        {
          headers: { auth, question_id: id },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  async function answerDelete(index) {
    const answerId = single.answer[index].id;
    try {
      await axios.get(
        "https://stack-bc.vercel.app/api/delete/answer",
        {
          headers: { auth, answer_id: answerId, user_id: user.id },
        }
      );
      location.reload();
    } catch (error) {
      console.error("Error deleting answer:", error);
    }
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
    alert("URL has been copied to clipboard");
  }

  async function answervoteup(index) {
      if(!user){
alert("You need to be signed in to vote");
    }
    else{
    const data = single.answer[index];
    const user_id = user.id;
    const updatedDownvotes = data.downvote ? data.downvote.filter((item) => item !== user_id) : [];

    if (!data.upvote || !data.upvote.includes(user_id)) {
      const updatedUpvotes = [...(data.upvote || []), user_id];

      const send = {
        upvote: updatedUpvotes,
        downvote: updatedDownvotes,
        voteType: "upvote",
        answer_id: data.id,
      };

      try {
        const response = await axios.post("https://stack-bc.vercel.app/answer/vote", send, {
          headers: {
            auth,
            question_id: id,
          },
        });

        if (response.status === 200) {
          setSingle((prev) => ({
            ...prev,
            answer: prev.answer.map((item, idx) =>
              idx === index
                ? { ...item, upvote: updatedUpvotes, downvote: updatedDownvotes }
                : item
            ),
          }));
        }
      } catch (error) {
        console.error("Error upvoting answer:", error);
      }
    }
    }
  }

  async function answervotedown(index) {
      if(!user){
alert("You need to be signed in to vote");
    }
    else{
    const data = single.answer[index];
    const user_id = user.id;
    const updatedUpvotes = data.upvote ? data.upvote.filter((item) => item !== user_id) : [];

    if (!data.downvote || !data.downvote.includes(user_id)) {
      const updatedDownvotes = [...(data.downvote || []), user_id];

      const send = {
        downvote: updatedDownvotes,
        upvote: updatedUpvotes,
        voteType: "downvote",
        answer_id: data.id,
      };

      try {
        const response = await axios.post("https://stack-bc.vercel.app/answer/vote", send, {
          headers: {
            auth,
          },
        });

        if (response.status === 200) {
          setSingle((prev) => ({
            ...prev,
            answer: prev.answer.map((item, idx) =>
              idx === index
                ? { ...item, upvote: updatedUpvotes, downvote: updatedDownvotes }
                : item
            ),
          }));
        }
      } catch (error) {
        console.error("Error downvoting answer:", error);
      }
    }
  }
  }

  return (
    <div className="flex justify-center items-start w-full">
      {!single ? (
        <div className="flex justify-center items-center h-screen w-full">
          <PacmanLoader color="gray" size={30} />
        </div>
      ) : (
        <div className="w-full lg:w-7/12 xl:w-6/12 p-4">
          <div className="w-full border-b border-slate-200 pb-2">
            <div className="text-2xl font-bold mb-4">{single.title}</div>
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/12 flex flex-col items-center">
                <img src={upvote} className="h-12" onClick={voteup} />
                <div>{single.upvote.length - single.downvote.length}</div>
                <img src={downvote} className="h-12" onClick={votedown} />
              </div>
              <div className="w-full lg:w-11/12 ml-0 lg:ml-4">
                <div className="font-light text-xl mb-1">{single.description}</div>
                <div className="flex flex-wrap">
                  {single.tags.map((item, index) => (
                    <div key={index} className="bg-sky-100 mr-2 p-1 rounded font-light">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-col lg:flex-row justify-between">
              <div className="flex flex-row text-md text-gray-500">
                <div className="mr-4" onClick={share}>
                  Share
                </div>
                {signedIn && user.name === single.name && (
                  <>
                    <div className="mr-4">Update</div>
                    <div onClick={questionDelete}>Delete</div>
                  </>
                )}
              </div>
              <div className="ml-0 lg:ml-auto mt-2 lg:mt-0">
                <div>created {timeCalc(single.time)} ago</div>
                <div className="flex flex-row items-center">
                  <div className="bg-orange-300 p-1.5 mr-2 rounded">
                    {single.name[0].toUpperCase()}
                  </div>
                  <div>{single.name}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xl mt-4">{single.answer.length} answers</p>
            <div>
              {single.answer.map((item, index) => {
                const answerTime = timeCalc(item.time);
                return (
                  <div
                    className="p-2 mb-2 border-b border-slate-200"
                    key={index}
                  >
                    <div>
                      <div className="w-full lg:w-1/12 flex flex-col items-center">
                        <img src={upvote} className="h-6" onClick={() => answervoteup(index)} />
                        <div>{(item.upvote?.length || 0) - (item.downvote?.length || 0)}</div>
                        <img src={downvote} className="h-6" onClick={() => answervotedown(index)} />
                      </div>
                      <div>{item.answer}</div>
                    </div>
                    <div className="flex flex-row justify-between mt-2">
                      <div className="text-sm text-gray-400">
                        Answered {answerTime} ago by {item.name}
                      </div>
                      <div className="text-red-400" onClick={() => answerDelete(index)}>
                        Delete
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full border-b border-slate-200 pb-2">
            <textarea
              className="w-full mt-2 p-2 border border-slate-300 rounded"
              rows="4"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer..."
            />
            <button className="bg-blue-500 text-white mt-2 px-4 py-2 rounded" onClick={postAnswer}>
              Post Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Render;
