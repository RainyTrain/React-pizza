import React, { createContext, useState } from 'react';

export const myContext = createContext();

function Context({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <myContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</myContext.Provider>
  );
}

export default Context;
