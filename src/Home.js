import React from 'react';
import './App.css';
import Button0 from './components/ButtonO'



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Zalando 10% korting</p>
                <Button0 >{["Maak code aan", "/code"]} </Button0>
            </header>
        </div >
    )
}

export default App;
