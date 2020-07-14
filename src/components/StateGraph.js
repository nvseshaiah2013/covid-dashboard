import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableRow, TableBody, TableCell, TableHead, Box, TableContainer, ButtonGroup, Button, Tooltip, IconButton, TableSortLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useSWR from 'swr';
import { STATE_NAMES } from '../constants/constants';
import { STATES_TOTAL, STATES_DAILY } from '../constants/urls';
import { statesTotal, statesDaily } from '../resources/useData';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: '2rem',
        color: 'white',
        paddingTop: '2rem'
    },
    toolbar: theme.mixins.toolbar,
    button: {
        fontSize: '0.7rem',
        padding: '2px'
    }
}));


const processDailyData = (data, statecode) => {
    if (!data) {
        return [];
    }
    let temp = data['states_daily'];
    let code = statecode.toLowerCase();
    let confirmed = temp.filter((confirm) => confirm['status'] === 'Confirmed').map((cases) => ({ count: cases[code], date: cases['date'] }));
    let deceased = temp.filter((death) => death['status'] === 'Deceased').map((cases) => ({ count: cases[code], date: cases['date'] }));
    let recovered = temp.filter((recover) => recover['status'] === 'Recovered').map((cases) => ({ count: cases[code], date: cases['date'] }));
    let dailyData = { confirmed: confirmed, deceased: deceased, recovered: recovered };
    return dailyData;
}

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
    const { data: daily_data } = useSWR(STATES_DAILY, statesDaily);
    const { data: total_data } = useSWR(STATES_TOTAL, statesTotal);
    const [p_daily_data, setPDailyData] = useState([]);
    const [p_total_data, setPTotalData] = useState([]);
    useEffect(() => {
        let code = typeof STATE_NAMES[match.params.statecode] !== 'undefined' ? match.params.statecode : 'UN';
        let temp = processDailyData(daily_data, code );
        setPDailyData(temp);
    }, [daily_data, match.params.statecode]);
    
    useEffect(() => {
        let code = typeof STATE_NAMES[match.params.statecode] !== 'undefined' ? match.params.statecode : 'UN';
        let temp = processTotalData(total_data,  code );
        setPTotalData(temp);
    }, [total_data, match.params.statecode])
    if(typeof STATE_NAMES[match.params.statecode] === 'undefined')
    {
        return (<Redirect to='/covid-dashboard'/>);
    }
    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography align="center" variant="h5">{STATE_NAMES[match.params.statecode]}</Typography>
            <div className={classes.toolbar} />
            <Box display={{ xs: 'block', sm: 'none' }}>
                <Typography variant="caption" align="right" display="block">
                    Scroll to View More <ArrowForwardIcon fontSize="small" elementType="span" />
                </Typography> 
            </Box>
            {p_total_data.length !== 0 ? <StateTable data={p_total_data} /> : ''}
            <div className={classes.toolbar} />

            <div className={classes.toolbar} />
            <Typography variant="h5" align="center">
                Statistics
            </Typography>
            <div className={classes.toolbar} />

            {p_daily_data.length !== 0 ? <ShowChart data={p_daily_data['confirmed']}
                label={`Confirmed Cases - ${STATE_NAMES[match.params.statecode]}`}
                color={'rgb(255,10,10)'}
            /> : ''}
            <div className={classes.toolbar} />

            {p_daily_data.length !== 0 ? <ShowChart data={p_daily_data['recovered']}
                label={`Recovered Cases - ${STATE_NAMES[match.params.statecode]}`}
                color={'rgba(10,255,10,0.8)'}

            /> : ''}
            <div className={classes.toolbar} />

            {p_daily_data.length !== 0 ? <ShowChart data={p_daily_data['deceased']}
                label={`Deceased Cases - ${STATE_NAMES[match.params.statecode]}`}
                color={'rgba(10,10,200,0.9)'}
            /> : ''}
            <div className={classes.toolbar} />
        </Container>
    );
}

const tableheaders = [
    { id: 'district', name: 'District', dataType: 'string' },
    { id: 'confirmed', name: 'Confirmed', dataType: 'number' },
    { id: 'tested', name: 'Tested', dataType: 'number' },
    { id: 'recovered', name: 'Cured', dataType: 'number' },
    { id: 'deceased', name: 'Deaths', dataType: 'number' }
]

const StateTable = (data) => {
    const [orderBy, setOrderBy] = useState('district');
    const [order, setOrder] = useState('asc');
    const [type, setType] = useState('string');
    let tableData = data.data;
    let totalRow = tableData.filter((row) => row['district'] === 'Total')[0];
    tableData = stableSort(tableData.filter((row) => row['district'] !== 'Total'), getComparator(order, orderBy, type));
    tableData.push(totalRow);
    const handleClick = (parameter, type) => {
        if (parameter === orderBy) {
            if (order === 'asc') {
                setOrder('desc');
            }
            else {
                setOrder('asc');
            }
        } else {
            setOrder('asc');
            setOrderBy(parameter);
        }
        setType(type);
    }
    return (
        <TableContainer>
            <Table stickyHeader={true} style={{ overflowX: 'scroll' }}>
                <TableHead>
                    <TableRow>
                        {tableheaders.map((headCell) => {
                            return (<TableCell key={headCell.id}
                                align={headCell.numeric ? 'right' : 'left'}
                                sortDirection={orderBy === headCell.id ? order : false}
                                onClick={() => handleClick(headCell.id, headCell.dataType)}
                            >
                                <Tooltip placement="top" arrow title={headCell.name} enterTouchDelay={100}>
                                    <IconButton aria-label="Table Cell Information" >
                                        <Typography display="block" variant="caption">
                                            {headCell.name}
                                        </Typography>
                                    </IconButton>
                                </Tooltip>
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                ></TableSortLabel>
                            </TableCell>);
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableData.map((row) => {
                            return (
                                <TableRow key={row.district} hover>
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

const ShowChart = ({ data, color, label }) => {
    const classes = useStyles();
    let [startDate, setStartDate] = useState(moment('02-03-2020', 'DD-MM-YYYY'));
    let max = data.reduce((acc, curval) => parseInt(curval['count']) > parseInt(acc['count']) ? curval : acc);
    let stepSize = (parseInt(max['count']) *0.25 ).toFixed(0);
    max = (parseInt(max['count']) * 1.10).toFixed(0);
    let chartData = {
        labels: data.filter((day) => moment(day['date'], 'DD-MMM-YY').isAfter(startDate)).map((day) => day['date']),
        datasets: [
            {
                label: label,
                data: data.filter((day) => moment(day['date'], 'DD-MMM-YY').isAfter(startDate)).map((day) => day['count']),
                backgroundColor: data.map((day) => color),
                borderColor: data.map((day) => color),
                borderWidth: 1,
                hoverBackgroundColor: 'white',
                hoverBorderColor: 'white'
            }
        ]
    };
    return (
        <Container>
            <Bar data={chartData} width={100} height={50} options={{ maintainAspectRatio: true, responsive: true, scales: { yAxes: [{ display: true, ticks: { display: true, min: 0, max: parseInt(max), stepSize: parseInt(stepSize) } }] } }} />

            <ButtonGroup size="small" aria-label="Statistics Filter Buttons" variant="outlined" fullWidth={true} style={{ marginTop: '1rem' }}>

                <Button color="primary" variant="outlined" className={classes.button} onClick={() => setStartDate(moment('02-03-2020', 'DD-MM-YYYY'))}> Beginning </Button>

                <Button color="secondary" variant="outlined" className={classes.button} onClick={() => setStartDate(moment().subtract(1, 'month'))}>Past Month</Button>

                <Button style={{ color: 'white' }} variant="outlined" className={classes.button} onClick={() => setStartDate(moment().subtract(2, 'weeks'))}> Past 2 Weeks </Button>
            </ButtonGroup>
        </Container>
    );
}


const descendingComparator = (a, b, orderBy, type) => {
    if (type === 'string') {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    if (type === 'number') {
        if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
            return -1;
        }
        if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
            return 1;
        }
    }
    if (type === 'date') {
        if (moment(b[orderBy], 'DD/MM/YYYY HH:mm:ss').isBefore(moment(a[orderBy], 'DD/MM/YYYY HH:mm:ss'))) {
            return -1;
        }
        if (moment(b[orderBy], 'DD/MM/YYYY HH:mm:ss').isAfter(moment(a[orderBy], 'DD/MM/YYYY HH:mm:ss'))) {
            return 1;
        }
    }
    return 0;
}

const getComparator = (order, orderBy, type) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy, type)
        : (a, b) => -descendingComparator(a, b, orderBy, type);
}

const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default StateGraph;