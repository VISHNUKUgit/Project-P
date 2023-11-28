import React, { createContext, useState } from 'react';

// Create a new context for user data
export const UserDataContext = createContext();

function UserDataProvider({ children }) {
  // Define state for user data
  const [userData, setUserData] = useState({});

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;
