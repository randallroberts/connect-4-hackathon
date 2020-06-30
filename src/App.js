import React from 'react';
import Board from './components/Board';

import './App.scss';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Connect 4</h1>
      </header>
      <main className="main">
        <Board />
      </main>
    </div>
  );
}

export default App;
