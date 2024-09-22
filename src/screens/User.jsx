import React, { useEffect, useState } from 'react';
import Topbar from "../components/Topbar.jsx";
import Left from "../components/Left.jsx";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const auth = localStorage.getItem("auth");

  useEffect(() => {
    async function call() {
      const response = await axios.get("https://stack-bc.vercel.app/api/send/user/all", {
        headers: { auth }
      });
      setData(response.data);
    }
    call();
  }, [auth]);

  function userRedirect(e) {
    const name = data[e].name;
    navigate(`/user/${name}`);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />
      <div className="flex flex-col md:flex-row items-center justify-center w-full mt-12">
        {/* Hide Left Sidebar on small screens */}
        <div className="hidden md:block md:w-1/4">
          <Left />
        </div>
        <div className="md:w-3/4 w-full p-3 flex justify-center">
          {!data ? (
            <div className="flex items-center justify-center h-screen p-3">
              <ClimbingBoxLoader color="black" size={40} />
            </div>
          ) : (
            <div className="flex flex-col w-full">
              <div className="mb-8 text-3xl font-bold text-center">Users</div>
              <div className="flex flex-col md:flex-row flex-wrap w-full mt-6 justify-center">
                {data.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-row mr-4 mb-4 p-4 border rounded-lg shadow-md hover:cursor-pointer hover:bg-gray-200"
                    data-id={index}
                    onClick={(e) => userRedirect(e.currentTarget.dataset.id)}
                  >
                    <div className="bg-gray-500 flex h-10 w-10 text-4xl p-3 rounded-full items-center justify-center">
                      {item.name[0]}
                    </div>
                    <div className="text-2xl ml-2">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
