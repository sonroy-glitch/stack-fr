import React, { useState } from "react";
import Topbar from "../components/Topbar.jsx";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();

  const postSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(10),
    tags: z.string().optional(),
  });

  async function run() {
    var token = localStorage.getItem("auth");
    if (token == null) {
      alert("Please login first");
    } else {
      const check = postSchema.safeParse({
        title,
        description,
        tags,
      });
      if (!check.success) {
        alert("You need to enter a proper title and description");
      } else {
        var tag = tags.split(" ");
        const response = await axios.post(
          "https://stack-bc.vercel.app/api/question",
          {
            title,
            description,
            tags: tag,
          },
          {
            headers: { auth: token },
          }
        );

        if (response.status === 200) {
          navigate(`/question/${response.data.id}`);
        }
        else if( response.status ===202){
          alert("You ran out of daily question limit"); 
        }
      }
    }
  }

  return (
    <div>
      <Topbar />
      <div className="flex flex-col fixed top-12 bottom-40 w-screen bg-gray-300 items-center justify-center z-0 px-4 sm:px-6 lg:px-8">
        <div className="flex w-full sm:w-5/6 md:w-4/6 lg:w-3/6 xl:w-2/6 flex-col">
          <p className="text-3xl sm:text-4xl md:text-5xl font-bold mt-10 sm:mt-20 mb-8 sm:mb-12">
            Ask a public Question
          </p>

          <div className="bg-slate-50 p-4 sm:p-6 rounded-xl">
            <div className="flex flex-col mb-6 sm:mb-7">
              <p className="text-lg sm:text-2xl">Title</p>
              <p className="text-sm sm:text-md mb-1">
                Be specific and imagine you’re asking a question to another person
              </p>
              <textarea
                placeholder="e.g Is there an R function for finding the index of an element in an vector?"
                className="p-2 rounded-md"
                onChange={(e) => setTitle(e.target.value)}
              >
                {title}
              </textarea>
            </div>
            <div className="flex flex-col mb-6 sm:mb-7">
              <p className="text-lg sm:text-2xl">Body</p>
              <p className="text-sm sm:text-md mb-1">
                Include all the information someone would need to answer your question
              </p>
              <textarea
                className="p-2 rounded-md h-32 sm:h-40"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-6 sm:mb-7">
              <p className="text-lg sm:text-2xl">Tags</p>
              <p className="text-sm sm:text-md mb-1">
                Add up to 5 tags to describe what your question is about
              </p>
              <input
                placeholder="e.g. (xml typescript wordpress)"
                className="p-2 rounded-md"
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6 sm:mt-8 mb-10 sm:mb-20">
            <button
              className="bg-blue-700 text-white p-2 rounded-md w-full sm:w-auto"
              onClick={run}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
