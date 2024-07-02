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
      if (ComputerPlayer.checkDiagonalWin(gridCopy) === symbol || ComputerPlayer.checkHorizontalWin(gridCopy) === symbol || ComputerPlayer.checkVerticalWin(gridCopy) === symbol){
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

    return ComputerPlayer.randomMove(grid);
  }

  static checkHorizontalWin(grid){
    //0. Create helper functions to check each element as either X, O, or if it's empty
    const checkX = box => box === 'X';
    const checkO = box => box === 'O';

    //1. Check for row wins
    //1a. Check if every row has either X or O
    for (let i = 0; i < grid.length; i++){
      let row = grid[i];

      if (row.every(checkX)){
        // Return 'X' if player X wins
        return 'X';
      } else if (row.every(checkO)){
        // Return 'O' if player O wins
        return 'O';
      }
    }
  }

  static checkVerticalWin(grid){
     //0. Create helper functions to check each element as either X, O, or if it's empty
     const checkX = box => box === 'X';
     const checkO = box => box === 'O';

    //2. Check for column wins
    //2a. Create new arrays to get values for each element in the column
    let column0 = [];
    let column1 = [];
    let column2 = [];

    //2b. Iterate through the grid to get the values of elements in each column
    grid.forEach(row => {
      for (let i = 0; i < row.length; i++){
        let column = row[i];

        switch (i){
          case 0:
            column0.push(column);
            break;
          case 1:
            column1.push(column);
            break;
          case 2:
            column2.push(column);
            break;
        }
      }
    })

    //2c. Check if any column is filled with X or O
    if (column0.every(checkX) || column1.every(checkX) || column2.every(checkX)){
      return 'X';
    } else if (column0.every(checkO) || column1.every(checkO) || column2.every(checkO)){
      return 'O';
    }

  }

  static checkDiagonalWin(grid){
    const checkX = box => box === 'X';
    const checkO = box => box === 'O';

    for (let i = 0; i < grid.length; i++){
      for (let j = 0; j < grid[i].length; j++){
        let diagonal1 = [grid[0][0], grid[1][1], grid[2][2]];
        let diagonal2 = [grid[0][2], grid[1][1], grid[2][0]];

        if (diagonal1.every(checkX) || diagonal2.every(checkX)){
          return 'X';
        } else if (diagonal1.every(checkO) || diagonal2.every(checkO)){
          return 'O';
        }
      }
    }
  }

}

module.exports = ComputerPlayer;
