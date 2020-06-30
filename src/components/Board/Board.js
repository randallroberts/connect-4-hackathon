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

    checkForWin(arr) {
        let count = 0;
        for (let i=0; i<arr.length; i++) {
            //If the cell is a player owned spot, start counting to 4
            if (arr[i] === this.state.whoseTurn) {
                count++;
            //If it's not player owned, reset the count because we don't have 4 in a row (yet)
            } else {
                count = 0;
            }

            //If we see 4 player owned cells in a row, return true (game is solved)
            if (count >= 4) {
                return true;
            }
        }

        //If we don't see a count of 4, return false (game is not solved)
        return false;
    }

    isSolved(cells) {
        
        let solvedFlag = false;

        for (let x = 0; x< this.boardRows; x++) {
            //for each row in the board, check for 4 in a row
            solvedFlag = this.checkForWin(cells[x]);

            if (solvedFlag)
                return ("Row", true);

            //Check each column in the board for 4 in a row
            solvedFlag = this.checkForWin(
                cells.map(colCell => {
                    return colCell[x];
                })
            );

            if (solvedFlag)
                return ("Col", true);
        }

        let count = 0;
        //Check diagonals for 4 in a row:
        for (let x=0; x<this.boardRows-3; x++) {
            console.log("Start diag check");
            for (let i=0; (i<this.boardColumns && x+i < this.boardRows); i++) {
                // console.log(`[${x+i}, ${i}]: ${cells[x+i][i]}`)
                if (cells[x+i][x] === this.state.whoseTurn) {
                    count++;
                    
                //If it's not player owned, reset the count because we don't have 4 in a row (yet)
                } else {
                    count = 0;
                }
    
                //If we see 4 player owned cells in a row, return true (game is solved)
                if (count >= 4) {
                    return true;
                }
            }
        }

        return (false);
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
            return true;
        }

        return false;
    }

    changePlayerTurn(x) {

        //update value of the cell to the player's identity
        let newCells = this.state.cells.map(row => {
            return row.slice();
        });

        console.log("newCells:", x, newCells[x])
        console.log("State Cells:", x, this.state.cells)
        newCells[this.state.height[x]][x] = this.state.whoseTurn;

        if (this.isSolved(newCells)) {
            alert("Congratulations to Player " + this.state.whoseTurn + "! You won!");
        }

        this.setState({
            cells: newCells.map(row => {
                return row.slice()
            }),
            whoseTurn: (this.state.whoseTurn + 1 >= this.numPlayers) ? 0 : this.state.whoseTurn + 1,
            height: this.changeHeight(x)
        });

    }

    cellExists (x, y) {
        //if the row exists, and the cell in that row exists
        if ((this.state.cells[x]) && (this.state.cells[x][y])) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        return (
            <>
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
                                    playerNumber={this.cellExists(x, y) ? this.state.cells[y][x] : -1}
                                    isBottom={this.isBottomCell(x, y)}
                                />)
                            })
                        }
                    </div>
                )
            })}

        </div>
        <div className="board-settings">
            <div className="board-settings__row"><div className="board-settings__label">Number of Players:</div> <input type="text" value={this.numPlayers}></input></div>
            <div className="board-settings__row"><div className="board-settings__label">Number of Rows:</div> <input type="text" value={this.boardRows}></input></div>
            <div className="board-settings__row"><div className="board-settings__label">Number of Columns:</div> <input type="text" value={this.boardColumns}></input></div>
        </div>
        </>
        );
    }
}
    
export default Board;
