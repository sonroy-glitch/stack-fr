import React, { useState } from 'react';
import jsSHA from 'jssha';
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { signupHolder } from "../state/atoms.jsx";
import moment from "moment-timezone";
import couponGenerator from "../utils/coupon";

function generateHash(key, txnid, planValue, planName, user, salt) {
  const hashString = `${key}|${txnid}|${planValue}|${planName}|${user.name}|${user.email}|||||||||||${salt}`;
  const shaObj = new jsSHA("SHA-512", "TEXT");
  shaObj.update(hashString);
  return shaObj.getHash("HEX");
}

const Payment = () => {
  const navigate = useNavigate();
  var [discount, setDiscount] = useState("no");
  var coupon = couponGenerator();
  const signup = useRecoilValue(signupHolder);
  const key = import.meta.env.VITE_APP_KEY;
  const salt = import.meta.env.VITE_APP_SALT;
  const user = JSON.parse(localStorage.getItem("user")) || signup || {
    name: '',
    email: '',
    phone: ''
  };

  
  function value(str){
    if(discount=="no"){
      if(str=='Bronze Plan'){
        return 100;
      }
       else if(str=='Silver Plan'){
        return 200;
      } else if(str=='Gold Plan'){
        return 1000;
      }
    }
    if(discount=="yup"){
      if(str=='Bronze Plan'){
        return 90;
      }
       else if(str=='Silver Plan'){
        return 270;
      } else if(str=='Gold Plan'){
        return 900;
      }
    }
  }

  const generateTxnid = () => {
    return `txn${Math.floor(Math.random() * 1000000000)}`;
  };

  const renderPaymentForm = (planName, planValue) => {
    var time = moment();
    if (time.tz('Asia/Kolkata').format('ha z') == "10pm IST") {
      const txnid = generateTxnid();
      const hash = generateHash(key, txnid, planValue, planName, user, salt);
      return (
        <form action="https://test.payu.in/_payment" method="POST">
          <input type="hidden" name="key" value={key} />
          <input type="hidden" name="txnid" value={txnid} />
          <input type="hidden" name="productinfo" value={planName} />
          <input type="hidden" name="amount" value={planValue} />
          <input type="hidden" name="email" value={user.email} />
          <input type="hidden" name="firstname" value={user.name} />
          <input type="hidden" name="phone" value={user.phone} />
          <input type="hidden" name="surl" value="https://stack-bc.vercel.app/success" />
          <input type="hidden" name="furl" value="https://stack-bc.vercel.app/failure" />
          <input type="hidden" name="hash" value={hash} />
          <input type="submit" value="Choose this plan" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors" />
        </form>
      );
    } else {
      return (
        <input value="Payment between 10-11AM" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors" />
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-8 md:space-y-0 mt-8 px-4">
      {/* Free Plan */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center border hover:shadow-xl transition-shadow duration-300">
        <div className="text-xl font-semibold mb-4">Free Plan</div>
        <div className="text-gray-600 mb-6">Only 1 question per day</div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors" onClick={() => navigate("/")}>
          Choose this plan
        </button>
      </div>

      {/* Bronze Plan */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center border hover:shadow-xl transition-shadow duration-300">
        <div className="text-xl font-semibold mb-4">Bronze Plan</div>
        <div className="text-gray-600 mb-2">Only 5 questions per day</div>
        <div className="text-gray-600 mb-6">Monthly charges of ₹100</div>
        {renderPaymentForm('Bronze Plan', value('Bronze Plan'))}
      </div>

      {/* Silver Plan */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center border hover:shadow-xl transition-shadow duration-300">
        <div className="text-xl font-semibold mb-4">Silver Plan</div>
        <div className="text-gray-600 mb-2">Only 10 questions per day</div>
        <div className="text-gray-600 mb-6">Monthly charges of ₹300</div>
        {renderPaymentForm('Silver Plan', value('Silver Plan'))}
      </div>

      {/* Gold Plan */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs text-center border hover:shadow-xl transition-shadow duration-300">
        <div className="text-xl font-semibold mb-4">Gold Plan</div>
        <div className="text-gray-600 mb-2">Unlimited questions per day</div>
        <div className="text-gray-600 mb-6">Monthly charges of ₹1000</div>
        {renderPaymentForm('Gold Plan', value('Gold Plan'))}
      </div>

      {/* Coupon Section */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-full max-w-xs text-center border hover:shadow-xl transition-shadow duration-300">
        <p className="text-lg text-green-600 font-semibold mb-4">Get 10% Discount!</p>
        <div className="text-xl font-semibold mb-4">Your Coupon Code</div>
        <div className="text-gray-800 font-mono mb-6 text-lg">{coupon}</div>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors" onClick={()=>{setDiscount("yup");alert("Coupon applied for 10% discount")}}>
          Apply Coupon
        </button>
      </div>
    </div>
  );
};

export default Payment;
