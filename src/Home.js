import React from 'react';
import './App.css';
import Button0 from './components/ButtonO'



function App() {
    return (
        <div className="App">
            <header className="App-header">
                <div className='card'>
                <p>Zalando 10% korting</p>
                <Button0 >{["Maak code aan", "/code"]} </Button0>

                <div className='circle1'></div>
                <div className='circle2'></div>

                </div>
            </header>
        </div >
    )
}

export default App;
