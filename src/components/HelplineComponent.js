import React from 'react';
import { Container, Box, makeStyles, Typography } from '@material-ui/core';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';

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
    }
}));

const Helpline = (props) => {
    const classes = useStyles();
    return (
        <Container maxWidth="sm">
            <Box p={4} className={classes.root}>
                <Typography variant="body2">
                    <PhoneEnabledIcon />
                    Contact Govt Of India                     
                </Typography>
                <Typography variant="body1">
                    Official Helpline At : +91-11-23978046 
                </Typography>
                <Typography variant="body1">
                    Toll Free Helpline At : 1075 
                </Typography>
                <Typography>
                    
                </Typography>
            </Box>
        </Container>
    );
}

export default Helpline;