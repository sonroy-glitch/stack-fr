import React,{useEffect,useState} from 'react'
import Topbar from "../components/Topbar.jsx"
import Home from "../components/Home.jsx"
import Left from "../components/Left.jsx"
import Render from "../components/Render.jsx"
import Sidebar from "../components/Sidebar.jsx"

import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useSetRecoilState } from "recoil";
import {signinChecker,questionHolder,userData} from "../state/atoms.jsx";
const Single = () => {
  

  
  
  return (
    <div className="relative min-h-screen">
  {/* Fixed Topbar */}
  <Topbar className="fixed top-0 left-0 w-full z-50" />

  {/* Container for the main content and sidebars */}
  <div className="flex flex-row pt-16 lg:pt-20 ">
    {/* Left Sidebar */}
    <div className="hidden lg:block lg:w-48 lg:fixed lg:left-0 xl:fixed xl:left-24 lg:top-12 lg:h-screen lg:border-r lg:border-slate-400">
      <Left />
    </div>

    {/* Main Content Area */}
    <div className="flex-1 lg:ml-48 lg:pl-4 lg:pr-64">
      
        <Render />
      
    </div>

    {/* Right Sidebar */}
    <div className="hidden lg:block lg:w-64 lg:fixed lg:right-0 xl:right-64 lg:top-12 lg:h-screen lg:border-l lg:border-gray-200 lg:bg-gray-50">
      <Sidebar />
    </div>
  </div>
</div>
  )
}

export default Single