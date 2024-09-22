import React, { useState, useEffect } from "react";
import { useJwt } from "react-jwt";
import axios from "axios";
import timeCalc from "../utils/timeCalc.js";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  signinChecker,
  questionHolder,
  singleHolder,
  userData,
} from "../state/atoms.jsx";
import PacmanLoader from "react-spinners/PacmanLoader";
import upvote from "../assets/upvote.svg";
import downvote from "../assets/downvote.svg";

const Render = () => {
  const auth = localStorage.getItem("auth");
  const signedIn = useRecoilValue(signinChecker);
  const [answer, setAnswer] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [single, setSingle] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    async function call() {
      var response = await axios.get(`https://stack-bc.vercel.app/send/${id}`);
      setSingle(response.data);
    }
    call();
  }, []);

  async function voteup(){
     
     var user_id = user.id;
     var updatedarr=[];
     updatedarr=single.downvote.filter((item)=>{
         if(item!=user_id){
            //  console.log(item)
             return item;
         }
     })
     
     var add =0;
     single.upvote.map((item)=>{
         if(item==user_id){
             add=1;
         }
         
     })
     if(add==0){
         single.upvote.push(user_id);
     }
     var send={
        upvote:single.upvote,
        downvote:updatedarr
     }
   const response = axios.post("https://stack-bc.vercel.app/api/vote",send,{
    headers:{
      auth,
      question_id:id
    }
   })
   location.reload();

  }
  async function votedown(){
     
    var user_id = user.id;
    var updatedarr=[];
    updatedarr=single.upvote.filter((item)=>{
        if(item!=user_id){
           //  console.log(item)
            return item;
        }
    })
    
    var add =0;
    single.downvote.map((item)=>{
        if(item==user_id){
            add=1;
        }
        
    })
    if(add==0){
        single.downvote.push(user_id);
    }
    var send={
       downvote:single.downvote,
       upvote:updatedarr
    }
  const response = axios.post("https://stack-bc.vercel.app/api/vote",send,{
   headers:{
     auth,
     question_id:id
   }
  })
  location.reload();

 }

  const navigate = useNavigate();

  async function postAnswer() {
    if (!signedIn) {
      alert("Signin before submitting an answer");
    } else {
      var response = await axios.post(
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
    }
  }

  async function questionDelete() {
    var response = await axios.get(
      "https://stack-bc.vercel.app/api/delete/question",
      {
        headers: { auth, question_id: id },
      }
    );
    navigate("/");
  }

  async function answerDelete(e) {
    const id1 = single.answer[e].id;
    var response = await axios.get(
      "https://stack-bc.vercel.app/api/delete/answer",
      {
        headers: { auth, answer_id: id1,user_id:user.id },
      }
    );
    location.reload();
  }

  function share() {
    navigator.clipboard.writeText(window.location.href);
    alert("URL has been copied to clipboard");
  }
  async function answervoteup(e){
     var data=single.answer[e];
    var user_id = user.id;
    var updatedarr=[];
    updatedarr=data.downvote.filter((item)=>{
        if(item!=user_id){
           //  console.log(item)
            return item;
        }
    })
    
    var add =0;
    data.upvote.map((item)=>{
        if(item==user_id){
            add=1;
        }
        
    })
    if(add==0){
        data.upvote.push(user_id);
    }
    var send={
       upvote:data.upvote,
       downvote:updatedarr,
       voteType:"upvote",
       answer_id:data.id
    }
  const response = axios.post("https://stack-bc.vercel.app/answer/vote",send,{
   headers:{
     auth,
     question_id:id
   }
  })
  location.reload();

 }
 async function answervotedown(e){
  var data = single.answer[e];
   var user_id = user.id;
   var updatedarr=[];
   updatedarr=data.upvote.filter((item)=>{
       if(item!=user_id){
          //  console.log(item)
           return item;
       }
   })
   
   var add =0;
   data.downvote.map((item)=>{
       if(item==user_id){
           add=1;
       }
       
   })
   if(add==0){
       data.downvote.push(user_id);
   }
   var send={
      downvote:data.downvote,
      upvote:updatedarr,
      voteType:"downvote",
      answer_id:data.id
   }
 const response = axios.post("https://stack-bc.vercel.app/answer/vote",send,{
  headers:{
    auth
  }
 })
 location.reload();

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
              {/* upvote button */}
                <img src={upvote} className="h-12" onClick={()=>voteup()}/>
                <div>{single.upvote.length - single.downvote.length}</div>
                {/* downvote butn */}
                <img src={downvote} className="h-12" onClick={()=>votedown()} />
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
              {single.answer.map((item, index1) => {
                const answerTime = timeCalc(item.time);
                return (
                  <div
                    className="p-2 mb-2 border-b border-slate-200"
                    key={index1} id={index1}
                  >
                    {/* answer up and downvote */}
                    <div>
                    <div className="w-full lg:w-1/12 flex flex-col items-center">
              {/* upvote button */}
                <img src={upvote} className="h-6" onClick={(e)=>answervoteup(index1)}/>
                <div>{item.upvote.length - item.downvote.length}</div>
                {/* downvote butn */}
                <img src={downvote} className="h-6" onClick={(e)=>answervotedown(index1)} />
              </div>
                    </div>
                    <p className="text-xl font-bold">{item.answer}</p>
                    <div className="mt-3 flex flex-col lg:flex-row justify-between">
                      {signedIn && user.name === item.name && (
                        <div className="flex flex-row text-md text-gray-500">
                          <div className="mr-4">Update</div>
                          <div
                            data-id={index1}
                            onClick={(e) => answerDelete(e.target.dataset.id)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                      <div className="ml-0 lg:ml-auto mt-2 lg:mt-0">
                        <div>created {answerTime} ago</div>
                        <div className="flex flex-row items-center">
                          <div className="bg-green-300 p-1.5 mr-2 rounded">
                            {item.name[0].toUpperCase()}
                          </div>
                          <div>{item.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xl mt-4">Your answer</p>
            <textarea
              rows="10"
              className="w-full border border-slate-400 mt-2 p-2"
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button
              className="bg-sky-400 p-2 rounded mt-2 w-full lg:w-auto"
              onClick={postAnswer}
            >
              Post your Answer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Render;
