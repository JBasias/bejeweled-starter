const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  up() {

    this.resetBackgroundColor();
    if(this.row>0) this.row--;
    this.setBackgroundColor();
    // Move cursor up
  }

  down() {
    this.resetBackgroundColor();
    if(this.row<7) this.row++;
    this.setBackgroundColor();
    // Move cursor down
  }

  left() {
    this.resetBackgroundColor();
    if(this.col >0) this.col--;
    this.setBackgroundColor();
    // Move cursor left
  }

  right() {
    this.resetBackgroundColor();
    if(this.col < 7) this.col++;
    this.setBackgroundColor();
    // Move cursor right
  }

}


module.exports = Cursor;
