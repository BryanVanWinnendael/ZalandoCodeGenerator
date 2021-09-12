import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

class Generator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "Getting Code",
            isLoaded: false,
            error2: false,

        };
        this.error = "";
    }
    componentDidMount() {
        fetch("https://zalandoapi.herokuapp.com/api").then((response) => {
            if (response.ok) {
                return response.text();

            } else {
                console.log("errorrrrr")
                throw new Error('Something went wrong');
            }
        })
            .then((responseJson) => {
                this.setState({
                    apiResponse: responseJson,
                    isLoaded: true,
                    error2: false,
                });
            })
            .catch((error) => {

                this.error = error;
                this.setState({
                    error2: true,
                    isLoaded: true
                });



            });

    }



    render() {

        var { apiResponse, isLoaded, error2 } = this.state;
        console.log(error2)
        console.log(isLoaded)
        console.log(this.state.apiResponse)
        if (!isLoaded) {
            return <div> Code aan het ophalen...</div>
        }
        if (error2 || this.state.apiResponse === undefined) {
            console.log("fout")
            return (
                <div className="App">
                    <header className="App-header">
                        <p>Er ging iets fout, probeer opnieuw</p>
                        <Button variant="contained" color="primary" className="buttonfont" href="/code">probeer opnieuw</Button>
                    </header>
                </div>
            );
        }

        else {
            return (
                <div className="App">
                    <header className="App-header">
                        <p>{this.state.apiResponse}</p>
                        <Button variant="contained" color="primary" className="buttonfont" href="/">Ga terug</Button>
                    </header>
                </div>
            );
        }

    }
}
export default Generator;
