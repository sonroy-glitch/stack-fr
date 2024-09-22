import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { questionHolder, singleHolder } from "../state/atoms.jsx";
import timeCalc from "../utils/timeCalc.js";

const Question = () => {
  const navigate = useNavigate();
  const data1 = useRecoilValue(questionHolder);
  const setSingle = useSetRecoilState(singleHolder);
  
  const data = [...data1];
  data.sort((a, b) => {
    const aScore = a.upvote.length - a.downvote.length;
    const bScore = b.upvote.length - b.downvote.length;
    return bScore - aScore;
  });

  function run(e) {
    const question = data[e];
    setSingle(question); // Set the selected question
    navigate(`/question/${question.id}`);
  }

  return (
    <div className="flex-grow p-4 lg:ml-72 lg:mr-64 md:ml-0 md:mr-0">
      <div className="flex flex-row justify-between mb-5">
        <div className="text-3xl font-bold">Top Questions</div>
        <div>
          <button onClick={() => navigate("/write")} className="text-2xl bg-blue-400 text-white rounded-md p-1">
            Add Question
          </button>
        </div>
      </div>
      <p className="text-2xl font-light mb-2">{data.length} Questions</p>
      {data.map((item, index) => {
        const time = timeCalc(item.time);
        return (
          <div key={index} className="flex flex-col md:flex-row bg-yellow-50 border-b border-slate-400 w-full text-xl items-start md:items-center p-3 mb-2 rounded-lg">
            <div className="mr-4 text-center">
              <div className="font-semibold">{item.upvote.length - item.downvote.length}</div>
              <div className="text-sm">votes</div>
            </div>
            <div className="mr-4 text-center">
              <div className="font-semibold">{item.answer.length}</div>
              <div className="text-sm">answers</div>
            </div>
            <div className="flex-grow mt-2 md:mt-0">
              <div className="text-blue-400 hover:cursor-pointer hover:underline" data-id={index} onClick={(e) => run(e.currentTarget.dataset.id)}>
                {item.title}
              </div>
              <div className="flex flex-row flex-wrap mt-1">
                {item.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="mr-2 bg-blue-200 text-blue-600 text-sm p-1 rounded-md">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-right text-sm mt-2 md:mt-0">
              {time} ago by <span className="font-medium">{item.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Question;
