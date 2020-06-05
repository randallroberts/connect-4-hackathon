import React from 'react';
import Board from './components/Board';

import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Tarek & Randall's Connect 4 Adventure</h1>
      </header>
      <main>
        <Board />
      </main>
    </div>
  );
}

export default App;
