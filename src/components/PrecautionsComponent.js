import React, { useState } from 'react';
import { Container, Typography, Box, Chip, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { symptoms, precautions } from '../resources/symptoms';
import { Trail } from 'react-spring/renderprops';
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
            backgroundColor: '#2290A0',
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
    let precautionsList = precautions.map((precaution, index) => {
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
    });
    return (
        <Box textAlign="center">
            <Container maxWidth="md" className={classes.root}>
                <div className={classes.toolbar} />
                <Typography variant="h4">
                    <span className={classes.leftBorder} />
                        Precautions of Coronavirus
                </Typography>
                <Container maxWidth="md">
                    <Trail items={precautionsList} keys={item => item.key} from={{ opacity : 0 }} to={{ opacity : 1}}>
                        {item => props => <div style={props}>{item}</div>}
                    </Trail>
                </Container>
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