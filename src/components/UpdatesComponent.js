import React from 'react';
import { UPDATES } from '../constants/urls';
import useSWR from 'swr';
import { updates } from '../resources/useData';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Trail } from 'react-spring/renderprops';
import Loading from './LoadingComponent';

import { Container, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        border: '2px solid gray',
        opacity: 0.8,
        '&:hover': {
            transform: 'translateY(1px)'
        },
        borderRadius: '3px 6px',
        margin: '0.5rem 0',
        padding: '1rem'
    },
    toolbar: theme.mixins.toolbar
}));

const getMinutesDiff = (date) => {
    return moment().diff(date * 1000, 'minutes');
};

const Updates = (props) => {
    const classes = useStyles();
    const { data } = useSWR(UPDATES, updates, { revalidateOnReconnect: true });
    if (data) {
        const updates = data.slice(-10).reverse().map((update, index) => {
            let diff = getMinutesDiff(update.timestamp);
            if (diff > 60) {
                let hours = parseInt(diff / 60);
                let minutes = diff % 60;
                return (
                    <div className={classes.listItem} key={index}>
                        <Typography variant="subtitle1">{hours} hours and {minutes} minutes ago</Typography>
                        <Typography variant="body2">{update.update}</Typography>
                    </div>
                );
            }
            else {
                return (
                    <div key={index} className={classes.listItem}>
                        <Typography variant="subtitle1">{diff} minutes ago</Typography>
                        <Typography variant="body2">{update.update}</Typography>
                    </div>
                );
            }
        });
        return (
            <Container maxWidth="md">
                <div className={classes.toolbar} />
                <Typography variant="h4" style={{ "textAlign": "center" }}>Recent Updates</Typography>
                <div className={classes.toolbar} />
                <Trail items={updates} keys={item => item.key} from={{ opacity : 0 }} to={{ opacity : 1 }}>
                    {item => props => <div style={props}>{item}</div>}
                </Trail>

            </Container>
        );
    }
    else
        return (
            <Loading />
        );
}

export default Updates;