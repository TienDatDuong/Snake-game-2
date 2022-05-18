import React, { createContext } from "react";


export const SnakeContext = createContext();
export const BOARD_SIZE = 10;
export const Start_vaue_snake = 44;
export const Start_value_food = 48;
export const StartNextValue = {
  row: BOARD_SIZE / 3,
  col: BOARD_SIZE / 3,
  cell: Start_vaue_snake,
};
export const Direction = {
  RIGHT: "RIGHT",
  UP: "UP",
  LEFT: "LEFT",
  DOWN: "DOWN",
};

const SnakeContextProvider = ({ children }) => {

 
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
