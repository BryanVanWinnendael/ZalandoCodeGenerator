import React from 'react';
import './App.css';
import Button0 from './components/ButtonO'

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
        fetch("https://apizalando.herokuapp.com/codes").then((response) => {
            if (response.ok) {
                return response.text();

            } else {
                console.log("error")
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
        console.log(apiResponse)
        if (!isLoaded) {
            return <div> Code aan het ophalen...</div>
        }
        if (error2 || this.state.apiResponse === undefined || this.state.apiResponse === "") {
            console.log("fout")
            return (
                <div className="App">
                    <header className="App-header">
                        <p>Er zijn geen codes meer</p>
                        <Button0 >{["Maak een code zelf aan", "/force"]} </Button0>

                    </header>
                </div>
            );
        }

        else {
            return (
                <div className="App">
                    <header className="App-header">
                        <p>{this.state.apiResponse}</p>
                        <Button0 >{["Ga terug", "/"]} </Button0>


                    </header>
                </div>
            );
        }

    }
}
export default Generator;
