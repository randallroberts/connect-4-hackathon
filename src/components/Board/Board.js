import React, {Component} from 'react';
import Cell from '../Cell';
import './Board.scss';

class Board extends Component {
    constructor(props) {
        super(props);
  
        //Game Settings
        this.numPlayers = 2;
        //Six rows, 7 columns by default
        this.boardRows = 6;
        this.boardColumns = 7; 

        this.state = {
            cells: this.makeBoard(), //x and y coordinates
            whoseTurn: 0, //eg: 2 player game, this will count from 0, 1, 0, 1...
            height: this.determineHeight()
        }
    }


    isSolved() {
        console.log("Determining if game is finished")
    }

    determineHeight() {
        let heightArr = [];

        for (let i = 0; i < this.boardColumns; i++) {
            heightArr.push(this.boardRows-1);
        }
        return heightArr;
    }

    changeHeight(x) {
        let newArr = this.state.height.map((column, key) => {
            
            if (key === x) {
                return column-1;
            }
            return column;
        });

        console.log("Change Height: ", newArr);

        return newArr;
    }

    makeBoard() {
        
        let newBoard = [];
        
        //for each row in the board
        for (let x = 0; x< this.boardRows; x++) {
            //draw a row of circles the length of the board's size (columns)
            let newRow = [];
            for (let y = 0; y < this.boardColumns; y++) {
                //initializing the board to default values
                newRow.push(-1);
            }
            newBoard.push(newRow);
        }
        return newBoard;
    }

    isBottomCell(x, y) {

        //if the cell is white, and y === current height of that column, it's playable
        if (y === this.state.height[x]) {
            //console.log("We are at the top of the stack");
            return true;
        }

        return false;
    }

    changePlayerTurn(x) {
        let turnNum = this.state.whoseTurn + 1;
        
        if (turnNum > this.numPlayers -1) {
            turnNum = 0;
        }

        this.setState({
            whoseTurn: turnNum,
            height: this.changeHeight(x)
        }, () => console.log("Turn change to: ", this.state.whoseTurn))
        
    }

    cellExists (x, y) {
        //if the row exists, and the cell in that row exists
        if ((this.state.cells[x]) && (this.state.cells[x][y])) {
            return true;
        } else {
            return false;
        }
    }

    componentDidMount() {
        this.makeBoard();
    }

    render() {
        return (
            <div className="board">
            
            {/* Render a 2d array of cell components*/}
            
            {this.state.cells.map ((row, y) => {
                return (
                    <div key={y} className="board-row">
                        {
                            row.map ( (cell, x) => {
                                //if x exists
                                //if y exists
                                //output the cell value (the player that 'owns' the cell)
                                //else -1 (no one owns the cell, display it as empty)
                                return (<Cell
                                    key={x + ((y*this.boardColumns))}
                                    playerTurn = {this.state.whoseTurn}
                                    finishPlayerTurn={this.changePlayerTurn.bind(this)}
                                    xCoord={x}
                                    yCoord={y}
                                    playerNumber={this.cellExists(x, y) ? this.state.cells[x][y] : -1}
                                    isBottom={this.isBottomCell(x, y)}
                                />)
                            })
                        }
                    </div>
                )
            })}

          </div>
        );
      }
    }
    
export default Board;
    