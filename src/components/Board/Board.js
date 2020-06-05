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
            whoseTurn: 0 //eg: 2 player game, this will count from 0, 1, 0, 1...
        }
    }


    isSolved() {
        console.log("Determining if game is finished")
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
        return true;

        // console.log(this.state, x, y);
        // // If the cell exists
        // if ((this.state.cells[x]) && (this.state.cells[x][y])) {
        // //Is the current cell white (ie: available)?
        // if (this.state.cells[x][y] === -1) {
        //     //Are we at the bottom? Then it's playable
        //     if (y === this.state.cells.length-1) {
        //         return true;
        //     //if we're not at the bottom, is the next row down already filled?
        //     } else if (this.state.cells[x][y+1] !== -1) {

        //     }
        // }
    }

    changePlayerTurn() {
        console.log("I am here", this.state.whoseTurn);
        let turnNum = this.state.whoseTurn + 1;
        
        if (turnNum > this.numPlayers -1) {
            turnNum = 0;
        }

        this.setState({
            whoseTurn: turnNum
        }, () => console.log(this.state.whoseTurn))
        
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
                                    key={x}
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
    