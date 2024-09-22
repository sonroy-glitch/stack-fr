import {atom } from "recoil"

export const signinChecker =atom ({
    key: 'signinChecker',
    default:false
})
export const questionHolder=atom({
    key:'questionHolder',
    default:[]
})
export const userData=atom({
    key:'userData',
    default:{}
})
export const singleHolder=atom({
    key:'singleHolder',
    default:{}
})
//create a atom to hold all users and thier data
// export const chatbot =atom({
//     key:'chatbot',
//     default:false
// })
export const signupHolder=atom({
    key:"signupHolder",
    default:{}
})