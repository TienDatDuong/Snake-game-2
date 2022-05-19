import React from "react";

function CreateTable({
  board,
  snakeCells,
  snakeFood,
  score,
  snake,
  tail,
  handleStart,
  handlePause,
}) {
  return (
    <div>
      <h1>Score : {score}</h1>

      {board.map((row, indRow) => (
        <div key={indRow} className="row">
          {row.map((colValue, indCell) => (
            <div
              key={indCell}
              className={`cell
             ${
               snakeCells.has(colValue) ? "snake-red" : "" && snakeCells.length
             } 
             ${snakeFood === colValue ? " snake-black " : ""}
             ${
               snakeCells.has(colValue) === false && colValue !== snakeFood
                 ? "cell-basic"
                 : ""
             }
          `}
            >
              {/* {colValue} */}
            </div>
          ))}
        </div>
      ))}

      <button className="pause" type="" onClick={() => handleStart()}>
        {" "}
        Start
      </button>
      <button className="pause" type="" onClick={() => handlePause()}>
        {" "}
        Pause
      </button>
    </div>
  );
}

export default CreateTable;
