import React from 'react';
import './App.css';
import Grid from './Grid.js'
import Navbar from "./components/Navbar"
import Header from "./components/Header"

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <h1>Twistybug's Triple</h1>
      <div className="App">
        <Grid/>
      </div>
      <div className="footer">Made with ♥ by Sophia Barnes</div>
    </>  
  );
}

export default App;
