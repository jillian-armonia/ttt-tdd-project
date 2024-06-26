const TTT = require("./ttt");

class ComputerPlayer {

  static getValidMoves(grid) {
    //0. Create a container list
    let validMoves = [];

    //1. Iterate through the grid
    for (let rowNum = 0; rowNum < grid.length; rowNum++){
      for (let colNum = 0; colNum < grid[rowNum].length; colNum++){
          //2. Check the grid for empty boxes
          if (grid[rowNum][colNum] === ' '){
            validMoves.push({row: rowNum, col: colNum});
          }
      }
    }

    //3. Return a list of moves with the corresponding rowNum and colNum for each move
    return validMoves;

  }

  static randomMove(grid) {
    //1. Get the list of valid moves
    let validMoves = ComputerPlayer.getValidMoves(grid);

    //2. Get a random index from 0 to the last index of the list
    let randomIndex = Math.floor(Math.random() * (validMoves.length - 1));
    //3. Return the randomly selected box
    return validMoves[randomIndex];
  }

  static getWinningMoves(grid, symbol) {
    //1. Get a list of valid moves
    let validMoves = ComputerPlayer.getValidMoves(grid);


    //2. Copy the grid to create a probable scenario without mutating the grid
    let gridCopy = grid.slice(0);

    //3. Iterate through the valid moves list
    for (let i = 0; i < validMoves.length; i++){
       //4. Try putting a valid move on the false grid and use the static checkWin() method to see if it is a winning move
      gridCopy[validMoves[i].row][validMoves[i].col] = symbol;
      //5. If it is a winning move that returns the symbol, then return that valid move
      if (TTT.checkWin(gridCopy) === symbol){
        return validMoves[i];
      } else {
        gridCopy[validMoves[i].row][validMoves[i].col] = ' ';
      }

    }

  }

  static getSmartMove(grid, symbol) {
    let winningMove = ComputerPlayer.getWinningMoves(grid, symbol);
    let opposingWin = ComputerPlayer.getWinningMoves(grid, 'O');

    //1. If there is a winning move, return that winning move
    if (winningMove !== undefined){
      return winningMove;
      //2. If there is no winning move and the enemy has a winning move, return a block move
    } else if (opposingWin !== undefined){
      return opposingWin;
    }

    return ComputerPlayer.randomMove();
  }

}

module.exports = ComputerPlayer;
