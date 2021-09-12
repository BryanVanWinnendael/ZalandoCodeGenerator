import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';


function App() {
    return (
        <div className="App">
            <header className="App-header">

                <p>Zalando 10% korting</p>
                <Button variant="contained" color="primary" className="buttonfont" href="/code">Maak code aan</Button>
            </header>
        </div>
    )
}

export default App;
