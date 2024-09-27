import React, { useEffect, useState } from 'react';
import Topbar from "../components/Topbar.jsx";
import Left from "../components/Left.jsx";
import { useParams } from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { signinChecker } from "../state/atoms.jsx";
import { useRecoilValue } from "recoil";
import axios from "axios";

const UserSingle = () => {
  const [data, setData] = useState(null);
  var  [points, setPoints] = useState('');
  const signedIn = useRecoilValue(signinChecker);
  const { name } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const auth = localStorage.getItem('auth');
  var [update,setUpdate]=useState("")
  useEffect(() => {
    async function call() {
      try {
        const response = await axios.get(`https://stack-bc.vercel.app/api/send/user/${name}`, {
          headers: { auth }
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    call();
  }, [name, auth]);
  async function send(){
    try {
      const response=await axios.post("https://stack-bc.vercel.app/api/points/share",{
        user_id:user.id,
        sent_name:name,
        points
      },
    {headers:{auth}})
    if(response.status==200){
      window.location.reload();
      alert("Points transfer successful");
    }
    else if (response.status==202){
      alert("Not enough points");
    }

    } catch (error) {
      console.log(err)
    }
  }
  async function edit(){
    var response =await axios.post("https://stack-bc.vercel.app/api/user",{
      about:update
    },
   {
    headers:{user_id:user.id,auth}
   })
   if(response.status==200){
    window.location.reload();
   }
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Topbar />

      <div className="flex w-full relative top-12">
        {/* <div className="hidden md:flex md:w-2/12 p-3 bg-gray-100">
          <Left />
        </div> */}

        <div className="flex-1 p-4 lg:pr-64">
          {!data ? (
            <div className="flex items-center justify-center  w-full h-screen">
              <ClimbingBoxLoader color="black" size={40} />
            </div>
          ) : (
            <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
              <div className="mb-4">
                <h1 className="text-2xl font-bold mb-2">{data.name}</h1>
               
              </div>
              <div className="mb-4">
                {(data.about)? <div>
                <p className="text-gray-700">{data.about}</p>

                </div>:<div>
                <p className="text-gray-700">No about yet</p>
                </div>}
                {signedIn && name === user.name && (
                  <input onChange={(e)=>setUpdate(e.target.value)}
                    className="border rounded w-full py-2 px-3 mt-1"
                    placeholder="Enter a new about for your profile"
                  />
                )}
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Points: {data.points}</p>
              </div>
              {signedIn && name !== user.name && (
                <div className="mb-4">
                  <input
                    className="border rounded w-full py-2 px-3"
                    placeholder="Enter points you want to share"
                    onChange={(e) => setPoints(e.target.value)}
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2" onClick={send}>
                    Send points
                  </button>
                </div>
              )}
              {signedIn && name === user.name && (
                <div className="mt-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={edit}>
                    Edit profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSingle;
