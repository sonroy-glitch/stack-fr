import { useState } from 'react'
import './App.css'
import {Route,Routes} from "react-router-dom"
import Home from "./screens/Home.jsx"
import Write from "./screens/Write.jsx"
import Signin from "./screens/Signin.jsx"
import Signup from "./screens/Signup.jsx"
import Question from "./screens/Question.jsx"
import Single from "./screens/Single.jsx"
import User from "./screens/User.jsx"
import UserSingle from "./screens/UserSingle.jsx"
import Chatbot from "./screens/Chatbot.jsx"
import Payment from "./screens/Payment.jsx"


function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/question" element={<Question/>}/>
      <Route path="/question/:id" element={<Single/>}/>
      <Route path="/user" element={<User/>}/>
      <Route path="/user/:name" element={<UserSingle/>}/>

      <Route path="/auth/signin" element={<Signin/>}/>
      <Route path="/auth/signup" element={<Signup/>}/>
      <Route path="/write" element={<Write/>}/>
      <Route path="/chatbot" element={<Chatbot/>}/>
      <Route path="/payment" element={<Payment/>}/>

    </Routes>
  )

}

export default App
