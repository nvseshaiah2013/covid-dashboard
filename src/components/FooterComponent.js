import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FreeBreakfastCoffee from '@material-ui/icons/FreeBreakfast';

const useStyles = makeStyles((theme) => ({
    content: {
        height: '10vh',
        backgroundColor : "primary",
        // color: 'white',
        marginTop: '5vh',
        // display : 'flex',
        textAlign : 'center',
        paddingTop : '2vh'
    }
}));

const Footer = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl" className={classes.content}>

            <Typography variant="body1">
                Made with <FavoriteIcon color="error" /> and <FreeBreakfastCoffee color="action" /> while at Home.
            </Typography>

        </Container>
    );
}

export default Footer;