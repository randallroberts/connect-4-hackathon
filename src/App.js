import React from 'react';
import Board from './components/Board';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Tarek & Randall's Connect 4 Adventure</p>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
