import React from 'react';
import { Container, Typography, makeStyles, Button, Box } from '@material-ui/core';
// import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    toolbar : theme.mixins.toolbar,
    heading : {
        margin : '1vh',
        borderBottom : '4px solid green',
        borderBottomLeftRadius : '5px',
        borderBottomRightRadius : '5px',
        width : 'fit-content'
    },
    margin : {
        marginTop : theme.spacing(2),
        marginBottom : theme.spacing(2)
    },
    marginLeft : {
        marginLeft : theme.spacing(2)
    },
    button : {
        textDecoration : 'none',
        color : 'white'
    },
    imageResponsive : {
        width : '100%',
        height : 'auto'
    }
}));

const Donate = (props) =>{
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            <div className={classes.toolbar} />
            <Typography variant="h4">
                Help India to Fight Coronavirus!
            </Typography>
            <Typography variant="h5" color="secondary" className={classes.margin}>
                Donate to PMCARES Fund to help the Govt of India to help you.
            </Typography>
            <Typography className={classes.heading} variant="h5">
                About PMCARES
            </Typography>
            <Box m={4}>                
                <Typography variant="body1" component="p">
                    PM - CARES fund is aimed at strengthening the fight against COVID-19. It will furthur
                    availability of quality treatment and encourage research on ways. I urge people from all walks of life
                    to contribute to PM - CARES. Together, let's solve the challenges of the present and protect the future.
                </Typography>

            </Box>
                <Typography variant="h5" component="p">
                    Have got any Ideas to fight 
                   <span style={{"color" : "red"}}>
                      #Coronavirus 
                    </span> 
                    <Button color="primary" variant="contained" className={classes.marginLeft}>
                        <a href="https://www.mygov.in/group-issue/share-your-ideas-suggestions-help-fight-coronavirus/" target="_blank" rel="noopener noreferrer" className={classes.button}> Give Idea </a>
                    </Button>
                </Typography>

                <Typography variant="body1" component="p" className={classes.margin}>
                    For More Details Visit the PMCARES website.
                </Typography>
                <Box>
                    <img src="/images/pmcares.jpg" alt="PM CARES Details" className={classes.imageResponsive}/>
                </Box>
                <Box style={{"text-align": "center"}}>
                    <Button style={{"background-color" : "green"}} variant="contained"> <a href="https://www.pmcares.gov.in" target="_blank"  rel="noopener noreferrer" className={classes.button}> Open PMCARES </a></Button>
                </Box>
        </Container>
    );
}
export default Donate;