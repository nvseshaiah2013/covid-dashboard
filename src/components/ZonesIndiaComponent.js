import React, { useState } from 'react';
import { Container, Typography, makeStyles, Chip, Avatar } from '@material-ui/core';
import { zones } from '../resources/useData';
import useSWR from 'swr';
import { ZONES_INDIA } from '../constants/urls';
import { STATE_NAMES } from '../constants/constants';
import { Spring, animated } from 'react-spring/renderprops';
import Loading from './LoadingComponent';

const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
        fontSize: '2rem',
    },
    hover: {
        '&:hover': {
            backgroundColor: '#2290A0',
            transform: 'translateY(-1px)'
        }
    }
}));

const groupStates = (data, stateNames = STATE_NAMES) => {
    if (!data) {
        return {};
    }
    const states = data.reduce((statesList, currentValue) => {
        if (!statesList[currentValue.statecode])
            statesList[currentValue.statecode] = { name: '', districts: [] };
        statesList[currentValue.statecode].districts.push(currentValue);
        return statesList;
    }, []);
    let keys = Object.keys(states);
    keys.forEach((key) => {
        states[key].name = stateNames[key];
    })
    return states;
}

const ZonesIndia = (props) => {
    const classes = useStyles();
    const { data } = useSWR(ZONES_INDIA, zones, { revalidateOnReconnect: true });
    const [selectedState, setSelectedState] = useState('AP');
    
    if (data) {
        let states = groupStates(data.zones);
        let keys = Object.keys(states);
        let statesList = keys.map((key) => {
            if(key === selectedState)
                return (<Chip key={key}
                    label={states[key].name}
                    avatar={<Avatar>{states[key].districts.length}</Avatar>}
                    onClick={() => setSelectedState(key)}
                    className={classes.hover} 
                    variant="outlined"
                    color="primary"
                    />);
            else
            return (
                <Chip key={key}
                    label={states[key].name}
                    avatar={<Avatar>{states[key].districts.length}</Avatar>}
                    onClick={() => setSelectedState(key)}
                    className={classes.hover} 
                    variant="outlined"
                    />);
        });
        return (
            <Container maxWidth="md">
                <div className={classes.toolbar} />
                <Typography align="center" variant="h4"> Zone Classification in India </Typography>
                <div className={classes.toolbar} />
                {/* <div> */}
                    <Spring native from={{opacity : 0}} to={{ opacity : 1 }}>
                        {props => <animated.div style={props} className={classes.chips}>{statesList}</animated.div>}
                    </Spring>
                {/* </div> */}
                <div className={classes.toolbar} />
                <DisplayZones state={states[selectedState]} />
            </Container>
        );
    }
    else
        return (
            <Loading />
        );
}

const DisplayZones = ({ state }) => {
    const classes = useStyles();
    const districts = state.districts.map((district) => {
        if(district.zone === 'Green'){
            return <Chip key={district.districtcode} style={{backgroundColor :"#0F0", color : "#000"}} label={district.district} className={classes.hover}/>
        }
        else if(district.zone === 'Orange'){
            return <Chip key={district.districtcode} style={{backgroundColor :"#FF8C00", color : "#000"}} label={district.district} className={classes.hover}/>
        }   
        else {
            return <Chip key={district.districtcode} style={{backgroundColor :"#F00"}} label={district.district} className={classes.hover}/>
        }
    });
    return (
        <Container maxWidth="sm" className={classes.chips}>
            {districts}
            <div className={classes.toolbar} />
        </Container>
    );
}

export default ZonesIndia;