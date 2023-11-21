import { BASE_URL } from "./baseURL"
import { commonAPI } from "./commonAPI"

// REGISTER
export const registerUser = async(user)=>{
 return await commonAPI("POST",`${BASE_URL}/user/register`,user,"")
}
// LogIn
export const loginAPI = async(user)=>{
    return await commonAPI("POST",`${BASE_URL}/user/login`,user,"")
}
// Add Projects
export const addProjectAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${BASE_URL}/project/add`,reqBody,reqHeader)
}