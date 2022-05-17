import { useContext, useEffect, useState } from "react";
import { SnakeContext } from "./Contexts/Context";
import "./App.css";
// import Board from "./Components/board";
import create_board from "./Components/board";
import CreateTable from "./Components/CreateTable";
import ComsumptionFood from "./Components/RamdomFood"
const BOARD_SIZE = 15;
const Start_vaue_snake = 82;
const Start_value_food = 86;
const StartNextValue = {
  row: BOARD_SIZE / 3,
  col: BOARD_SIZE / 3,
  cell: Start_vaue_snake,
};
const getStartingSnakeLLValue = board => {
  const rowSize = board.length;
  const colSize = board[0].length;
  const startingRow = Math.round(rowSize / 3);
  const startingCol = Math.round(colSize / 3);
  const startingCell = board[startingRow][startingCol];
  return {
    row: startingRow,
    col: startingCol,
    cell: startingCell,
  };
};

function App() { 
  const {Direction, SnakeNode,SnakeBody} = useContext(SnakeContext)

  const [score,setScore] = useState(0)
  const [board, setBoard] = useState(create_board(BOARD_SIZE));
    // bug 1 StartNextValue -
  // const [snakeCells, setSnakeCells] = useState(new Set([Start_vaue_snake]));
  const [snakeCells, setSnakeCells] = useState(new Set([StartNextValue]));
  const [snakeFood, setSnakeFood] = useState(Start_value_food);
  const [direction, setDirection] = useState(Direction.Right);
  const [snake, setSnake] = useState(new SnakeBody(getStartingSnakeLLValue(board)));

  useEffect(() => {
    const run = setInterval(() => {
      moveSnake();
    }, 1000);
    return () => clearInterval(run);
  }, []);

  const moveSnake = () => {
    const currentHeadSnake = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };
    const NextHeadSnake = getNextHeadSnake(currentHeadSnake, direction);
    const newValueSnake = board[NextHeadSnake.row][NextHeadSnake.col];
    const newHead = new SnakeNode({
      row: NextHeadSnake.row,
      col: NextHeadSnake.col,
      cell: newValueSnake,
    });
    const currentHead = snake.head;
    snake.head = newHead;
    currentHead.next = newHead;

    const newSnakeCell = new Set(snakeCells);
    newSnakeCell.delete(snake.tail.value.cell);
    newSnakeCell.add(newValueSnake);

    snake.tail = snake.tail.next;
    if (snake.tail === null) snake.tail = snake.head;
    
    if( newSnakeCell === snakeFood) {
      console.log("datdt")
      HandleComsumptionFood(newSnakeCell)
    }

    setSnakeCells(newSnakeCell);
  };

  const HandleComsumptionFood = (newSnakeCell) => {
        const max = BOARD_SIZE * BOARD_SIZE
        let nextFood
        while (true) {
          nextFood  = ComsumptionFood(1,max)
          if (newSnakeCell.has(nextFood) || snakeFood === nextFood) continue;
        break;
        }
        setSnakeFood(nextFood)
        setScore(score + 1)
  }

  const getNextHeadSnake = (node, direction) => {
    if (direction === Direction.Right) {
      return {
        row: node.row,
        col: node.col + 1,
      };
    }
    if (direction === Direction.Left) {
      return {
        row: node.row,
        col: node.col - 1,
      };
    }
    if (direction === Direction.Up) {
      return {
        row: node.row - 1,
        col: node.col,
      };
    }
    if (direction === Direction.Down) {
      return {
        row: node.row - 1,
        col: node.col,
      };
    }
  };
  return (
    <div className="App">
      <CreateTable
        board={board}
        snakeCells={snakeCells}
        snakeFood={snakeFood}
        score={score}
      />
    </div>
  );
}

export default App;
