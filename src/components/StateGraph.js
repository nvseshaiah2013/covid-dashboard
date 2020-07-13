import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableRow, TableBody, TableCell, TableHead, TableContainer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import { STATE_NAMES } from '../constants/constants';
import { STATES_TOTAL } from '../constants/urls';
import { statesTotal } from '../resources/useData';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '2rem',
        color: 'white',
        paddingTop: '2rem'
    },
    toolbar: theme.mixins.toolbar
}));


// const processDailyData = (data, statecode) => {
//     if(!data){
//         return [];
//     }
//     // let temp = data['states_daily'];
//     // let code = statecode.toLowerCase();
//     let keys = Object.keys(data['states_daily']);
//     let dailyData = keys.map((key) => {
        
//     });
//     return dailyData;
// }

const processTotalData = (data, statecode) => {
    if (!data) {
        return [];
    }
    let state = data[statecode]['districts'];
    let keys = Object.keys(state);
    let total = {
        district: 'Total',
        confirmed: 0,
        tested: 0,
        recovered: 0,
        deceased: 0
    }
    let stateObj = keys.map((key) => {
        total['confirmed'] += (state[key]['total']['confirmed'] ? state[key]['total']['confirmed'] : 0);
        total['deceased'] += state[key]['total']['deceased'] ? state[key]['total']['deceased'] : 0;
        total['recovered'] += state[key]['total']['recovered'] ? state[key]['total']['recovered'] : 0;
        total['tested'] += state[key]['total']['tested'] ? state[key]['total']['tested'] : 0;
        return {
            district: key,
            confirmed: state[key]['total']['confirmed'] ? state[key]['total']['confirmed'] : 0,
            tested: state[key]['total']['tested'] ? state[key]['total']['tested'] : 0,
            recovered: state[key]['total']['recovered'] ? state[key]['total']['recovered'] : 0,
            deceased: state[key]['total']['deceased'] ? state[key]['total']['deceased'] : 0
        };
    });
    stateObj.push(total);
    return stateObj;
}

const StateGraph = ({ match }) => {
    const classes = useStyles();
    // const { data: daily_data } = useSWR(STATES_DAILY, statesDaily);
    const { data: total_data } = useSWR(STATES_TOTAL, statesTotal);
    // const [p_daily_data, setPDailyData] = useState([]);
    const [p_total_data, setPTotalData] = useState([]);
    // useEffect(() => {
    //     let temp = processDailyData(daily_data, match.params.statecode);
    //     setPDailyData(temp);
    // }, [daily_data, match.params.statecode]);

    useEffect(() => {
        let temp = processTotalData(total_data, match.params.statecode);
        setPTotalData(temp);
    }, [total_data, match.params.statecode])
    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography align="center" variant="h5">{STATE_NAMES[match.params.statecode]}</Typography>
            <div className={classes.toolbar} />
            {/* {p_daily_data} */}
            {p_total_data.length !== 0 ? <StateTable data={p_total_data} /> : ''}
            <StatePieChart />
        </Container>
    );
}

const tableheaders = [
    { _id: 'district', name: 'District', datatype: 'string' },
    { _id: 'confirmed', name: 'Confirmed', datatype: 'number' },
    { _id: 'tested', name: 'Tested', datatype: 'number' },
    { _id: 'recovered', name: 'Cured', datatype: 'number' },
    { _id: 'deceased', name: 'Deaths', datatype: 'number' }
]

const StateTable = (data) => {
    return (
        <TableContainer>
            <Table stickyHeader={true} style={{ overflowX: 'scroll' }}>
                <TableHead>
                    <TableRow>
                        {tableheaders.map((cell) => {
                            return (<TableCell key={cell._id}>{cell.name}</TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.data.map((row) => {
                            return (
                                <TableRow key={row.district}>
                                    <TableCell>
                                        {row.district}
                                    </TableCell>

                                    <TableCell>
                                        {row.confirmed}
                                    </TableCell>

                                    <TableCell>
                                        {row.tested}
                                    </TableCell>

                                    <TableCell>
                                        {row.recovered}
                                    </TableCell>

                                    <TableCell>
                                        {row.deceased}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const StatePieChart = (data) => {
    return (
        <Container>
            {'   '}
        </Container>
    );
}

export default StateGraph;