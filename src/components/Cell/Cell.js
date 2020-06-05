import React, {Component} from 'react';
import './Cell.scss';

class Cell extends Component {
    constructor(props) {
        super(props);
  
        this.state = {
            color: 'white'
        }
    }
  
  determineColor (playerTurn) {
    
    let color = 'white';
    
    switch(playerTurn) {
        case 0: {
          color = 'yellow'
          break;
        }
        case 1: {
          color = 'red'
          break;
        }
        default:
          color = 'white';
      }

      return color;
  }

  changeColor() {

    // console.log("Cell State:", this.state);
    // console.log("Cell Props:", this.props);
    
    //if bottom cell is Bottom-most playable cell in that column and empty, change colour to this player's colour
    if ((this.props.isBottom) && (this.state.color === "white" )) {
        this.setState( {
            color: this.determineColor(this.props.playerTurn)
        })
        //this will go back to Board and finish the player's turn
        this.props.finishPlayerTurn(this.props.xCoord);
    } else {
        //this isn't the lowest cell in the column, we need to notify the player somehow
        console.error("This is not a playable cell");
    }    
  }

  render () {
    return (
        <div onClick={this.changeColor.bind(this)} className="cell" style={{backgroundColor: this.state.color}}>
        {/* //img? */}
        {/* {(this.props.playerNumber >=0) ? this.props.playerNumber : `X:${this.props.xCoord} Y:${this.props.yCoord}`} */}
        </div>
    );
  }
}

export default Cell;
