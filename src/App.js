import { useContext, useEffect, useState } from "react";
import { SnakeContext } from "./Contexts/Context";
import "./App.css";
import create_board from "./Components/board";
import ComsumptionFood from "./Components/RamdomFood";
import {
  BOARD_SIZE,
  Start_value_food,
  StartNextValue,
  Direction,
} from "./Contexts/Context";
import { useInterval } from "./lib/utlils";
import CreateTable from "./Components/CreateTable";
const getStartingSnakeLLValue = (board) => {
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
  const { SnakeNode, SnakeBody } = useContext(SnakeContext);
  const [score, setScore] = useState(0);
  const [board, setBoard] = useState(create_board(BOARD_SIZE));
  const [snakeFood, setSnakeFood] = useState(Start_value_food);
  const [snakeCells, setSnakeCells] = useState(new Set([StartNextValue.cell]));
  const [isStart, setIsStart] = useState(false);
  const [delays, setDelays] = useState(100000 * 100000);
  const [snake, setSnake] = useState(
    new SnakeBody(getStartingSnakeLLValue(board))
  );
  const [direction, setDirection] = useState(Direction.RIGHT);

  useInterval(() => {
    moveSnake();
  }, delays);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      handleKeydown(e);
    });
  }, []);

  const handleKeydown = (e) => {
    const newDirection = getDirectionFromKey(e.key);
    const isValidDirection = newDirection !== "";
    if (!isValidDirection) return;
    setDirection(newDirection);
  };
  const handleStart = () => {
    console.log("start");
    setDelays(Number(250));
    setScore(0);
    const snakeStartingValue = getStartingSnakeLLValue(board);
    setSnakeFood(snakeStartingValue.cell + 3);
    setSnakeCells(new Set([snakeStartingValue.cell]));
    setSnake(new SnakeBody(snakeStartingValue));
    setDirection(Direction.RIGHT);
  };
  const handlePause = () => {
    setIsStart(!isStart)
    if (isStart === true) {
      setDelays(100000*100000)
    }else{
      setDelays(250)
    }
  };

  const moveSnake = () => {
    const currentHeadSnake = {
      row: snake.head.value.row,
      col: snake.head.value.col,
    };
    const NextHeadSnake = getNextHeadSnake(currentHeadSnake, direction);
    if (isOutOfBoard(NextHeadSnake, board)) {
      restartGame();
      return;
    }
    const newValueSnake = board[NextHeadSnake.row][NextHeadSnake.col];
    if (snakeCells.has(newValueSnake)) {
      restartGame();
      return;
    }

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

    const foodConsumed = newValueSnake === snakeFood;
    if (foodConsumed) {
      handleComsumptionFood(newSnakeCell);
      growSnake(newSnakeCell);
    }

    setSnakeCells(newSnakeCell);
  };

  // const moveSnake = () => {

  // };
  const growSnake = (newSnakeCell) => {
    const growthNodeCoords = getGrowthNodeCoords(snake.tail, direction);
    const newTailCell = board[growthNodeCoords.row][growthNodeCoords.col];
    const newTail = new SnakeNode({
      row: growthNodeCoords.row,
      col: growthNodeCoords.col,
      cell: newTailCell,
    });
    const currentTail = snake.tail;
    snake.tail = newTail;
    snake.tail.next = currentTail;
    newSnakeCell.add(newTailCell);
  };

  const handleComsumptionFood = (newSnakeCell) => {
    const max = BOARD_SIZE * BOARD_SIZE;
    let nextFood;
    while (true) {
      nextFood = ComsumptionFood(1, max);
      if (newSnakeCell.has(nextFood) || snakeFood === nextFood) continue;
      break;
    }
    setSnakeFood(nextFood);
    setScore(score + 1);
  };
  const restartGame = () => {
    setScore(" 0 - Game Over");
  };

  return (
    <div className="App">
      <CreateTable
        board={board}
        snakeCells={snakeCells}
        snakeFood={snakeFood}
        score={score}
        snake={snake}
        handlePause={handlePause}
        handleStart={handleStart}
      />
    </div>
  );
}

const getNextHeadSnake = (node, direction) => {
  if (direction === Direction.RIGHT) {
    return {
      row: node.row,
      col: node.col + 1,
    };
  }
  if (direction === Direction.LEFT) {
    return {
      row: node.row,
      col: node.col - 1,
    };
  }
  if (direction === Direction.UP) {
    return {
      row: node.row - 1,
      col: node.col,
    };
  }
  if (direction === Direction.DOWN) {
    return {
      row: node.row + 1,
      col: node.col,
    };
  }
};

const getDirectionFromKey = (direction) => {
  if (direction === "ArrowUp" || direction === "w") return Direction.UP;
  if (direction === "ArrowRight" || direction === "d") return Direction.RIGHT;
  if (direction === "ArrowDown" || direction === "s") return Direction.DOWN;
  if (direction === "ArrowLeft" || direction === "a") return Direction.LEFT;
  return "";
};

const isOutOfBoard = (coords, board) => {
  const { row, col } = coords;
  if (row < 0 || col < 0) return true;
  if (row >= board.length || col >= board[0].length) return true;
  return false;
};
const getNextTailDirection = (snakeTail, tailOfDirection) => {
  if (snakeTail.next === null) return tailOfDirection;
  const { row: currentRow, col: currentCol } = snakeTail.value;
  const { row: nextRow, col: nextCol } = snakeTail.next.value;
  if (currentRow === nextRow && currentCol === nextCol + 1) {
    return Direction.RIGHT;
  }
  if (currentRow === nextRow && currentCol === nextCol - 1) {
    return Direction.LEFT;
  }
  if (currentRow === nextRow + 1 && currentCol === nextCol) {
    return Direction.DOWN;
  }
  if (currentRow === nextRow - 1 && currentCol === nextCol + 1) {
    return Direction.UP;
  }
  return "";
};
const getGrowthNodeCoords = (snakeTail, tailOfDirection) => {
  const tailNextDirection = getNextTailDirection(snakeTail, tailOfDirection);
  const opposDirection = getOpppDirection(tailNextDirection);
  const currentTail = {
    row: snakeTail.value.row,
    col: snakeTail.value.col,
  };
  const growNodeCoods = getNextHeadSnake(currentTail, opposDirection);

  return growNodeCoods;
};
const getOpppDirection = (direction) => {
  if (direction === Direction.RIGHT) return Direction.LEFT;
  if (direction === Direction.LEFT) return Direction.RIGHT;
  if (direction === Direction.UP) return Direction.DOWN;
  if (direction === Direction.DOWN) return Direction.UP;
};

export default App;
