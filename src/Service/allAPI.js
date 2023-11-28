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
// getThreeProjects 
export const getThreeProjects = async()=>{
    return await commonAPI("GET",`${BASE_URL}/projects/home-projects`,"","")
}

// get all projects
 
export const getAllProjects = async(searchValue,reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/projects/all?search=${searchValue}`,"",reqHeader)
}

// get user Projects

export const getUserProjects = async (reqHeader)=>{
    return await commonAPI("GET",`${BASE_URL}/user/all-projects`,"",reqHeader)
}

// Update project

export const updateProject = async(projectId,reqBody,reqHeader)=>{
    
    return await commonAPI("PUT",`${BASE_URL}/projects/edit/${projectId}`,reqBody,reqHeader)
}

// Delete project

export const deleteAProject = async(projectId,reqHeader)=>{
    console.log("inside allApi");
    return await commonAPI("DELETE",`${BASE_URL}/delete/project/${projectId}`,{},reqHeader)
                                                
}