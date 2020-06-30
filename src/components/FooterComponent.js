import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FreeBreakfastCoffee from '@material-ui/icons/FreeBreakfast';

const useStyles = makeStyles((theme) => ({
    content: {
        height: '10vh',
        backgroundColor: "blue",
        color: 'white',
        marginTop: '5vh'
    }
}));

const Footer = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth="xl" className={classes.content}>

            <Typography variant="body1">
                Made with <FavoriteIcon color="error" /> and <FreeBreakfastCoffee color="brown" /> while at Home.
            </Typography>

        </Container>
    );
}

export default Footer;