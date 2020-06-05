import React from 'react';
import './Cell.scss';

function Cell(props) {
  
  function determineColour (playerNumber) {
    
    let color = 'white';
    
    switch(playerNumber) {
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
  
  return (
    <div className="cell" style={{backgroundColor: determineColour(props.playerNumber)}}>
      {/* //img? */}
      P{props.playerNumber}
    </div>
  );
}

export default Cell;
