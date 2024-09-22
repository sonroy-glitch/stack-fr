import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import { signinChecker, userData } from "../state/atoms.jsx";
import axios from "axios";

const Topbar = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useRecoilState(signinChecker);
  const setUser = useSetRecoilState(userData);
  const [search, setSearch] = useState(true);

  var tag = localStorage.getItem("tag");

  useEffect(() => {
    async function call() {
      var auth = localStorage.getItem("auth");
      var verify = await axios.get("https://stack-bc.vercel.app/verify", {
        headers: { auth },
      });

      if (verify.status === 200) {
        setUser(verify.data);
        localStorage.setItem("user", JSON.stringify(verify.data));
        setSignedIn(true);
      }
    }
    call();
  }, []);

  function logout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("tag");
    localStorage.removeItem("data");
    localStorage.removeItem("user");

    setSignedIn(false);
    localStorage.setItem("signin", false);

    navigate("/");
  }

  return (
    <div className="flex flex-row w-screen justify-around items-center p-0.5 text-3xl border-t-2 border-orange-700 z-100 fixed top-0 shadow bg-white">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={logo} className="h-9" />
      </div>
      <div className="hidden md:block">
        <p>About</p>
      </div>
      <div className="hidden md:block">
        <p>Products</p>
      </div>
      <div className="hidden md:block">
        <p>For Teams</p>
      </div>
      <div className="flex flex-row items-center space-x-2">
        <input
          placeholder="🔎Search..."
          className="border border-slate-500 p-1 text-sm sm:text-base rounded"
        />
        {signedIn ? (
          <div className="flex items-center space-x-2">
            <div className="flex rounded-full bg-blue-500 text-white border border-black-500 px-2 py-1 text-sm sm:text-base" onClick={()=>navigate("/payment")}>
              {tag}
            </div>
            <button
              className="text-sm sm:text-base border border-blue-400 rounded bg-blue-100 p-1"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="text-sm sm:text-base border border-blue-300 rounded p-1"
            onClick={() => navigate("/auth/signin")}
          >
            Log in
          </button>
        )}
        {signedIn && (
          <div
            onClick={() => navigate("/chatbot")}
            className="cursor-pointer text-sm sm:text-base"
          >
            Chatbot
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
