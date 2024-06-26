const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require('./computer-player')

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    this.isComputerActive = false;

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('up', 'move up', this.cursor.up.bind(this.cursor));
    Screen.addCommand('down', 'move down', this.cursor.down.bind(this.cursor));
    Screen.addCommand('left', 'move left', this.cursor.left.bind(this.cursor));
    Screen.addCommand('right', 'move right', this.cursor.right.bind(this.cursor));
    Screen.addCommand('return', 'place move', this.placeMove.bind(this));
    //Add a command to activate the computer AI
    Screen.addCommand('a', 'play against computer', this.activateComputer.bind(this));

    Screen.render();
  }

  //Create a method to place a move
  placeMove(){
    if (this.grid[this.cursor.row][this.cursor.col] === ' '){
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      this.cursor.resetBackgroundColor();

      switch(this.playerTurn){
        case 'O':
          this.playerTurn = "X";
          this.cursor.cursorColor = "magenta";
          break;
        case 'X':
          this.playerTurn = "O";
          this.cursor.cursorColor = "yellow";
          break;
      }

      this.cursor.row = 0;
      this.cursor.col = 0;
      this.cursor.setBackgroundColor();


      if (TTT.checkWin(this.grid) === false){
        Screen.render();
      } else {
        TTT.endGame(TTT.checkWin(this.grid));
        Screen.render();
      }
    }

    if (this.isComputerActive === true){
      if (this.playerTurn === 'O'){
        return;
       } else {
        let move = ComputerPlayer.getSmartMove(this.grid, this.playerTurn);
        this.cursor.row = move.row;
        this.cursor.col = move.col;
        this.placeMove();
       }
    }
  }

  //Create a method that activates the AI
  activateComputer(){
   this.isComputerActive = true;
   Screen.setMessage('You are playing against the computer');
   Screen.render();
  }



  static checkWin(grid) {
    //0. Create helper functions to check each element as either X, O, or if it's empty
    const checkX = box => box === 'X';
    const checkO = box => box === 'O';
    const checkEmpty = box => box === ' ';

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

    //3. Check for diagonal wins
    //3a. Iterate through the grid and check the values of each possible diagonal win combination
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


    //4. Check if the grid has no empty boxes
    if (!grid[0].some(checkEmpty) && !grid[1].some(checkEmpty) && !grid[2].some(checkEmpty)){
      // 4a. Return 'T' if the game is a tie
      return 'T';
    } else {
      //4b. Return false if the game has not ended
      return false;
    }



  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = TTT;
