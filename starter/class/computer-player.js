const TTT = require("./ttt");

class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];

    for (let rowNum = 0; rowNum < grid.length; rowNum++){
      for (let colNum = 0; colNum < grid[rowNum].length; colNum++){
          if (grid[rowNum][colNum] === ' '){
            validMoves.push({row: rowNum, col: colNum});
          }
      }
    }

    return validMoves;

  }

  static randomMove(grid) {
    let validMoves = ComputerPlayer.getValidMoves(grid);
    let randomIndex = Math.floor(Math.random() * (validMoves.length - 1));

    return validMoves[randomIndex];
  }

  static getWinningMoves(grid, symbol) {
    let validMoves = ComputerPlayer.getValidMoves(grid);

    //Copy the grid without mutating it
    let gridCopy = grid.slice(0);

    for (let i = 0; i < validMoves.length; i++){
       //Set a symbol on a valid move
      gridCopy[validMoves[i].row][validMoves[i].col] = symbol;

      //5. If it is a winning move, then return that valid move
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

    if (winningMove !== undefined){
      return winningMove;
    } else if (opposingWin !== undefined){
      return opposingWin;
    }

    return ComputerPlayer.randomMove(grid);
  }

  /*******Copied the checkWin() method to be a static ComputerPlayer method ******/
  static checkHorizontalWin(grid){
    const checkX = box => box === 'X';
    const checkO = box => box === 'O';
    for (let i = 0; i < grid.length; i++){
      let row = grid[i];

      if (row.every(checkX)){
        return 'X';
      } else if (row.every(checkO)){
        return 'O';
      }
    }
  }

  static checkVerticalWin(grid){
     const checkX = box => box === 'X';
     const checkO = box => box === 'O';

    let column0 = [];
    let column1 = [];
    let column2 = [];

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
