import React from 'react';
import './App.css';
import Button0 from './components/ButtonO'

class ForceGenerator extends React.Component {
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
        console.log(this.state)
        fetch("https://apizalando.herokuapp.com/api").then((response) => {
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
                    <div className='card'>
                        <p>Er ging iets fout, probeer opnieuw.</p>
                        <p></p>
                        <Button0 >{["Probeer opnieuw", "/force"]} </Button0>
                        <div className='circle1'></div>
                        <div className='circle2'></div>
                    </div>
                    </header>
                </div>
            );
        }

        else {
            return (
                <div className="App">
                    <header className="App-header">
                    <div className='card'>
                        <p>Code gemaakt!</p>
                        <Button0 >{["Krijg code", "/code"]} </Button0>
                        <div className='circle1'></div>
                        <div className='circle2'></div>
                        </div>
                    </header>
                </div>
            );
        }

    }
}
export default ForceGenerator;
