import React from 'react';
import './App.css';
import Generator from './Generator';
import ForceGenerator from './ForceGenerator';

import Home from './Home';



import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
     
        <Route exact path="/" component={Home} />
        <Route exact path="/code" component={Generator} />
        <Route exact path="/force" component={ForceGenerator} />
       
      </header>
    </div>
  )
}

export default App;
