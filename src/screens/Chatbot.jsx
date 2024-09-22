import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot = () => {
  var [sessionarr, setSessionArr] = useState([]);
  var timeout ;
  var [otpsuccess, setOtpSuccess] = useState(false);
  var [otp, setOtp] = useState();
  var [check, setCheck] = useState();
  var [question, setQuestion] = useState("");
  var[message,setMessage]=useState(null)
  var auth = localStorage.getItem("auth");

  useEffect(() => {
  setTimeout(() => {
    setMessage(null)
  }, 6000);
  }, [message])
  
  async function otpFetch() {
    var response = await axios.get("https://stack-bc.vercel.app/api/otp", {
      headers: { auth },
    });
    setCheck(response.data.otp);
  }

  async function verify() {
    if (otp == check) {
      setOtpSuccess(true);
      var response = await axios.post(
        "https://stack-bc.vercel.app/chatbot",
        { question }
      );
      setSessionArr((oldArray) => [...oldArray, response.data]);
      setOtp("");
    } else {
      setMessage(" OTP is incorrect.");
     
    }
  }

  async function send() {
    await otpFetch();
    alert("OTP sent");
  }

  function otpDebounced(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setOtp(e);
    }, 1000);
  }

  function questionDebounced(e) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setQuestion(e);
    }, 1000);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Chatbot</h1>
        
        <div className="space-y-4">
          {sessionarr.map((item, index) => (
            <div key={index} className="bg-gray-100 p-3 rounded-lg">
              <div className="font-bold text-gray-800">Q: {item.question}</div>
              <div className="text-gray-600">A: {item.answer}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="How can I help you today?"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => questionDebounced(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={send}
            >
              Send
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter OTP"
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => otpDebounced(e.target.value)}
              value={otp}
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              onClick={verify}
            >
              Verify
            </button>
          </div>
        </div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default Chatbot;
