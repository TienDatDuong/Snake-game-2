import React, { createContext } from "react";


export const SnakeContext = createContext();

const SnakeContextProvider = ({ children }) => {

  const Direction = {
    Right: "Right",
    Up: "Up",
    Left: "Left",
    Down: "Down",
  };
  class SnakeNode {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  class SnakeBody {
    constructor(value) {
      const node = new SnakeNode(value);
      this.head = node;
      this.tail = node;
    }
  }
  

  const SnakeData = {
    Direction,
    SnakeNode,
    SnakeBody
  };

  return (
    <SnakeContext.Provider value={SnakeData}>
      {children}
    </SnakeContext.Provider>
  );
};

export default SnakeContextProvider;
