import React, { createContext, useState } from 'react'
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
function ContextShare({children}) {
    const [addProjectResponse,setaddProjectResponse] =useState({})
    const [editProjectResponse,setEditProjectresponse] = useState({})
  return (
    <>
        <addProjectResponseContext.Provider value={{addProjectResponse,setaddProjectResponse}}>
        <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectresponse}}>
          {children}
        </editProjectResponseContext.Provider>  
        </addProjectResponseContext.Provider>
    
    </>
  )
}

export default ContextShare


