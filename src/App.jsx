import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Harmonium from './component/Harmonium/Harmonium';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Harmonium />
      </div>
    </ThemeProvider>
  );
}

export default App;