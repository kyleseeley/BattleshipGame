import Board from "./board.js";

let board = new Board(); // creates a new game board

// Examine the grid of the game board in the browser console.
// Create the UI of the game using HTML elements based on this grid.
console.log(board.grid);

// Your code here

window.addEventListener("DOMContentLoaded", (event) => {
  const gameOverMessage = document.createElement("h2");
  gameOverMessage.innerText = "You Win!";
  gameOverMessage.setAttribute("id", "game-over");
  gameOverMessage.style.color = "transparent";
  document.body.appendChild(gameOverMessage);

  const resetBtn = document.createElement("button");
  resetBtn.setAttribute("id", "reset");
  resetBtn.innerText = "Reset Game";
  resetBtn.style.display = "none";

  document.body.appendChild(resetBtn);

  const gameBoard = document.createElement("main");
  gameBoard.setAttribute("id", "board");

  board.grid.forEach((row, i) => {
    row.forEach((box, j) => {
      const boardEl = document.createElement("div");
      boardEl.id = `${i}_${j}`;
      boardEl.className = "square";
      boardEl.dataset.row = i;
      boardEl.dataset.col = j;
      gameBoard.append(boardEl);
    });
  });

  document.body.appendChild(gameBoard);

  let checkClicks = (event) => {
    if (event.target.className === "square") {
      let hitOrMiss = board.makeHit(
        event.target.dataset.row,
        event.target.dataset.col
      );
      if (!hitOrMiss) {
        event.target.style.backgroundColor = "red";
      } else {
        event.target.style.backgroundColor = "green";
        event.target.innerText = hitOrMiss;
      }
    }
  };
  gameBoard.addEventListener("click", checkClicks);

  gameBoard.addEventListener("click", () => {
    if (board.isGameOver()) {
      const gameOver = document.getElementById("game-over");
      gameOver.style.color = "blue";
      gameBoard.removeEventListener("click", checkClicks);

      setTimeout(() => {
        gameOver.style.color = "transparent";
      }, 5000);

      setTimeout(() => {
        const reset = document.getElementById("reset");
        reset.style.display = "block";
      }, 5001);
    }
  });

  resetBtn.addEventListener("click", () => {
    window.location.reload();
  });
});
