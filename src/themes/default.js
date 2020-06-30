import {createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

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
        secondary : {
            light: '#0066ff',
            main: '#0044ff',
            // dark: will be calculated from palette.secondary.main,
            contrastText: '#ffcc00',
        }
    }

});

export default theme;