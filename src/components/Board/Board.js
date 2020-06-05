import React, {Component} from 'react';
import Cell from '../Cell';
import './Board.scss';

class Board extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            cells: [[], []], //x and y coordinates
            whoseTurn: 0 //eg: 2 player game, this will count from 0, 1, 0, 1...
        }

        //Game Settings
        this.numPlayers = 2;
        //Six rows, 7 columns by default
        this.boardRows = 6;
        this.boardColumns = 7; 
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
        this.setState({ cells: newBoard });
    }

    componentDidMount() {
        this.makeBoard();
    }

    render() {
        return (
            <div className="board">
            
            {/* Render a 2d array of cell components*/}
            
            {this.state.cells.map (row => {
                return (
                    <div className="board-row">
                        {
                            row.map ( cell => {
                                return (<Cell playerNumber={this.state.whoseTurn} />)
                            })
                        }
                    </div>
                )
            })}

              
              {/* Cells need an onClick handler to change colour to player's colour */}
              {/* When cell colour changes (ie: player clicks a cell), that cell's value should change in state, which will run isSolved() */}

          </div>
        );
      }
    }
    
export default Board;
    