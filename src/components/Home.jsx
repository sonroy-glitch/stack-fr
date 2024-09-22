import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue,useSetRecoilState } from "recoil";
import { signinChecker, questionHolder,singleHolder } from "../state/atoms.jsx";
import timeCalc from "../utils/timeCalc.js"

const Home = () => {
  const navigate = useNavigate();
  const data = useRecoilValue(questionHolder);
  const setSingle = useSetRecoilState(singleHolder)
  function run(e){
    var question= data[e] 
    navigate(`/question/${question.id}`)
  }
  return (
    <div>
      <div className="flex flex-row justify-between mb-5">
        <div className="text-3xl font-bold">All Questions</div>
        <div>
          <button onClick={() => navigate("/write")} className="text-2xl bg-blue-400 text-white rounded-md p-1">Add Question</button>
        </div>
      </div>
      <p className="text-2xl font-light mb-2">{data.length} Questions</p>
      {(data.length===0)?
      
        <div className="flex  flex-col justify-center items-center mt-80 text-2xl">
          <div>
          No questions yet 
          </div>
          <div>
          <a href="/write" className="text-sm text-blue-700  hover:underline ">Add a question</a>
          </div>
          
          </div>
      
      
     : data.map((item, index) => {
      var time =timeCalc(item.time)
        return (
          <div key={index} className="flex flex-row bg-yellow-50 border-b border-slate-400 w-6/6 text-xl items-center p-1  ">
            <div className="mr-2 items-center justify-center">
            <div className="pl-3    ">{item.upvote.length - item.downvote.length}</div>
            <div>votes</div>
            </div>
            <div className="mr-2">
            <div className="pl-5">{item.answer.length} </div>
            <div>answers</div>
            </div>
                      
            <div className="w-4/6 justify-center">
              <div className="text-blue-400 hover:cursor-pointer" data-id={index} onClick={(e)=>run(e.currentTarget.dataset.id)
              }>{item.title}</div>
              <div className="flex flex-row    ">
                {item.tags.map((item, index) => {
                  return <div key={index} className="mr-2 bg-blue-200 text-blue p-0.5 rounded-md  ">{item}</div>;
                })}
              </div>
            </div>
            <div className="text-md">{time} ago by {item.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
