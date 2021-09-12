import React from "react";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Button from '@material-ui/core/Button';


const theme = createTheme({
    palette: {

        secondary: {
            main: '#D7722C',
            contrastText: "#fff",
        },

    }

});


const ButtonO = (param) => {
    return (
        <ThemeProvider theme={theme}>
            <Button variant="contained" color="secondary" className="buttonfont" href={param.children[0][1]}>{param.children[0][0]}</Button>
        </ThemeProvider>
    );
}

export default ButtonO;