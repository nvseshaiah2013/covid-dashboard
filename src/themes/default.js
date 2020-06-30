import {createMuiTheme } from '@material-ui/core';
import { red,green } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography : {
        fontFamily : [
            'Overpass',
            'Roboto',
            'sans-serif'
        ].join(',')
    },
    pallete : {
        primary : red,
        success : green
    }

});

export default theme;