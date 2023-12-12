const Screen = require("./screen");
const Cursor = require("./cursor");
var emoji = require('emoji');

const kiwi = '\u{1F95D}';
const strawberry = "\u{1F353}";
const coconut = "\u{1F965}";
const grapes = "\u{1F347}";
const tangerine = "\u{1F34A}";

const fruits =[ "A" , "B", "C", "D" , "E"];

class Bejeweled {

  constructor() {

    this.playerTurn = "O";

    // Initialize this
    this.grid = [];


    for(let i=0;i<8;i++)
    {
      let col = [];

      for(let j=0;j<8;j++)
      {
         col.push(Math.floor(Math.random()*5)%5 + 1);
      }

      this.grid.push(col);
    }

    //this.renderBoard;

    this.cursor = new Cursor(8, 8);

    Screen.initialize(8, 8);
    Screen.setGridlines(false);

    this.cursor.setBackgroundColor();

    Screen.addCommand('up',   'move upward'  , ()=>{this.cursor.up(); Screen.render()});
    Screen.addCommand('down', 'move downward', ()=> {this.cursor.down(); Screen.render()});
    Screen.addCommand('left', 'move left', ()=>{ this.cursor.left(); Screen.render()});
    Screen.addCommand('right', 'move right',()=>{ this.cursor.right();Screen.render()});
    Screen.addCommand('s', 'switch horizontal',()=>{

      let x = this.cursor.row;
      let y = this.cursor.col;
       if(y<7)
       {
            let hold = this.grid[x][y];
            this.grid[x][y] = this.grid[x][y+1];
            this.grid[x][y+1] = hold;
            this.refresh();
            //this.checkForMatches();
            //this.renderBoard();
            //Screen.render();
       }

    });

    Screen.addCommand('d', 'switch vertical',()=>{

      let x = this.cursor.row;
      let y = this.cursor.col;
       if(x>0)
       {
            let hold = this.grid[x][y];
            this.grid[x][y] = this.grid[x-1][y];
            this.grid[x-1][y] = hold;

            this.refresh();
            //this.checkForMatches()
            //this.renderBoard();
            //Screen.render();
       }

    });

    Screen.addCommand('t', 'testing the clear function',()=>{


        //let ret = this.checkForMatches();

        //let cur=5000;

        while(/*cur>0 && */this.checkForMatches())
        {
          //cur--;
          this.renderBoard();
          Screen.render();

          //setTimeout(()=>{

            this.clearBoard();
            this.renderBoard();
            Screen.render();

          //},10000);

          /*
          this.clearBoard();
          this.renderBoard();
          Screen.render();
          */
          //ret = this.checkForMatches()


        }
        //this.checkForMatches();
        //this.clearBoard();
        this.renderBoard();
        Screen.render();

    });


    this.refresh();
    /*
    this.checkForMatches();
    this.renderBoard();
    //const emoji = "\u{2764}";
    //Screen.setGrid(0, 1,emoji);
    Screen.render(); */
  }

  refresh()
  {


        while(/*cur>0 && */this.checkForMatches())
        {
          //cur--;
          this.renderBoard();
          Screen.render();

          //setTimeout(()=>{

            this.clearBoard();
            this.renderBoard();
            Screen.render();

          //},10000);

          /*
          this.clearBoard();
          this.renderBoard();
          Screen.render();
          */
          //ret = this.checkForMatches()


        }
        //this.checkForMatches();
        //this.clearBoard();
        this.renderBoard();
        Screen.render();


  }

  renderBoard()
  {

    //const kiw = '\u{2764}';

    for(let i=0;i<8;i++)
    {
      for(let j=0;j<8;j++)
      {
        if(this.grid[i][j]>=0) Screen.setGrid(i,j, fruits[this.grid[i][j] - 1]);
        else Screen.setGrid(i,j, ' ');
      }
    }

  }

    checkForMatches() {


    let ret=false;

    for(let i=0;i<8;i++)
    {
      for(let j=0;j<8;j++)
      {
          if( i<6 && (Math.abs(this.grid[i][j]) === Math.abs(this.grid[i+1][j])) &&
          (Math.abs(this.grid[i+1][j]) === Math.abs(this.grid[i+2][j])))
          {
            ret=true;
            this.grid[i][j] = (-1) * Math.abs(this.grid[i][j]);
            this.grid[i+1][j] = (-1) * Math.abs(this.grid[i][j]);
            this.grid[i+2][j] = (-1) * Math.abs(this.grid[i][j]);
          }
          if(j<6 && (Math.abs(this.grid[i][j]) === Math.abs(this.grid[i][j+1])) &&
          (Math.abs(this.grid[i][j+1]) === Math.abs(this.grid[i][j+2])))
          {
            ret=true;
            this.grid[i][j] = (-1) * Math.abs(this.grid[i][j]);
            this.grid[i][j+1] = (-1) * Math.abs(this.grid[i][j]);
            this.grid[i][j+2] = (-1) * Math.abs(this.grid[i][j]);
          }
      }

      //return ret;
    }

    return ret;
    // Fill this in

  }

  clearBoard()
  {


    for(let j=0;j<8;j++)
    {
        let row = [];

        for(let i=0;i<8;i++)
        {
          if(this.grid[i][j]>=0) row.push(this.grid[i][j]);
        }

        let cur=7;

        for(let i=row.length -1 ;i>=0;i--)
        {
           this.grid[cur][j] = row[i];
           cur--;
        }

        while(cur>=0)
        {
          this.grid[cur][j]=  Math.floor(Math.random()*5)%5 + 1;  //-1;
          cur--;
        }
    }
  }

}

module.exports = Bejeweled;
