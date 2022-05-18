import { BOARD_SIZE } from "../App";
 const create_board = (BOARD_SIZE) => {
  let counter = 1;
  let board = [] ;
  for(let row = 0 ; row < BOARD_SIZE ; row++){
      let currentRow = []
      for(let col = 0; col < BOARD_SIZE ; col++){
        currentRow.push(counter++)
      }
      board.push(currentRow)
  }
  return board
}
export default create_board