import React from 'react';
import { Container, Box, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root : {
        border : '1px solidi red',
        backgroundColor : 'orange',
        color : 'white',
        borderRadius : '5px 3px',
        fontWeight : 'bolder',       
        '&:hover' : {
            boxShadow : '1px 1px',
            transform : 'scale(1.01)'
        }
    },
    text : {
        textDecoration : 'none',
        color : 'white'
    }
}));

const Helpline = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm" style={{"marginTop" : "2vh"}}>
            <Box p={4} className={classes.root}>
                <Typography variant="h5">
                    Govt Of India Coronavirus Helpline                   
                </Typography>
                <Typography variant="body1">
                    Official Helpline At : 
                    <a href="tel:+911123978046" className={classes.text}>
                         +91-11-23978046   
                    </a>
                </Typography>
                <Typography variant="body1">
                    Toll Free Helpline At : 
                    <a href="tel:1075" className={classes.text}> 1075</a>
                    
                </Typography>
                <Typography>

                    Email Id Helpline : <a href="mailto:ncov2019@gov.in" className={classes.text}> ncov2019@gov.in</a>
                </Typography>
            </Box>
        </Container>
    );
}

export default Helpline;