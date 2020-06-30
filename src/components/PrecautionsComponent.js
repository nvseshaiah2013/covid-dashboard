import React, { useState } from 'react';
import { Container, Typography, makeStyles, Box, Chip, List, ListItem, ListItemText } from '@material-ui/core';
import { symptoms, precautions } from '../resources/symptoms';
const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3vh'
    },
    leftBorder: {
        borderLeft: '1rem solid green',
        width: 'fit-content',
        marginRight: '1rem'
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    hover: {
        '&:hover': {
            backgroundColor: 'lightgreen',
            transform: 'translateY(-1px)'
        }
    },
    inline: {
        display: 'inline'
    },
    toolbar: theme.mixins.toolbar
}));

const Precautions = (props) => {
    const classes = useStyles();
    const [selected, setSelected] = useState(0);
    return (
        <Box textAlign="center">
            <Container maxWidth="md" className={classes.root}>
                <Typography variant="h4">
                    <span className={classes.leftBorder} />
                        Symptoms Of Coronavirus
                </Typography>
                <div className={classes.toolbar} />
                <div className={classes.chips}>
                    {
                        symptoms.map((symptom, index) => {
                            if (selected === index) {
                                return (
                                    <Chip key={symptom.id} label={symptom.name} className={classes.hover} onClick={() => setSelected(index)} color="primary" />
                                );
                            }
                            else
                                return (
                                    <Chip key={symptom.id} label={symptom.name} className={classes.hover} onClick={() => setSelected(index)} />
                                );
                        })
                    }
                </div>
                <div className={classes.toolbar} />
                <Description selected={selected} />
                <div className={classes.toolbar} />
                <Typography variant="h4">
                    <span className={classes.leftBorder} />
                        Precautions of Coronavirus
                </Typography>
                <Container maxWidth="md">
                    <List>
                        {precautions.map((precaution, index) => {
                            return (
                                <ListItem key={precaution.id}>
                                    <ListItemText
                                        primary={
                                            <React.Fragment>
                                                <Typography variant="h5" color="primary">
                                                    {precaution.heading}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body1"
                                                    className={classes.inline}
                                                    color="textSecondary"
                                                >
                                                    {precaution.description}
                                                </Typography>

                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                </Container>
            </Container>
        </Box>
    );
}

const Description = ({ selected }) => {
    return (
        <Container maxWidth="sm">
        
                {symptoms[selected].description.split('.').map((description, index) => {
                    return (
                        <Typography key={index} variant="body1" color="textSecondary">{description} </Typography>
                    );
                })}

        </Container>
    );
}

export default Precautions;