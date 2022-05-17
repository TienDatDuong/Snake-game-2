import React from 'react'

function CreateTable({board,snakeCells,snakeFood,score}) {
  return (
    <div>
      <h1>Score : {score}</h1>
       {board.map((row,indRow)=>(
        <div key={indRow} className="row">
          {row.map((colValue,indCell)=>(
            <div key={indCell} className={`cell
             ${snakeCells.has(colValue) ? "snake-red" : ""} 
             ${snakeFood === colValue ? " snake-black " : ""}
             ${snakeCells.has(colValue) ===  false && colValue !== snakeFood ? "cell-basic" : ""}`}  
            >
              {/* {colValue} */}
               </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default CreateTable