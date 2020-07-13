import {
    Container, Grid, Table, TableBody, TableCell,
    TableHead, TableRow, TableSortLabel, Typography, Tooltip, TableContainer, IconButton
} from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import moment from 'moment';
import React, { useState } from 'react';
import useSWR from 'swr';
import { COUNTRY_DATA } from '../constants/urls';
import { countryData } from '../resources/useData';
import Loading from './LoadingComponent';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';
import  { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        fontSize: '1rem',
        lineHeight: '0.2rem',
        letterSpacing: '1.1px'
    },
    boxBorderConfirm: {
        color: '#000FF1',
        flexGrow: 1,
        textAlign: 'center',
        padding: '0.1rem',
        '&:hover': {
            backgroundColor: 'rgba(0,15,241,0.1)',
            borderRadius: '8px'
        }
    },
    boxBorderFatal: {
        color: '#ff3838',
        flexGrow: 1,
        textAlign: 'center',
        padding: '0.1rem',
        '&:hover': {
            backgroundColor: 'rgba(255,56,56,0.1)',
            borderRadius: '8px'
        }
    },
    boxBorderActive: {
        color: '#a0a39e',
        flexGrow: 1,
        textAlign: 'center',
        padding: '0.1rem',
        '&:hover': {
            backgroundColor: 'rgba(160,163,158,0.1)',
            borderRadius: '8px'
        }
    },
    boxBorderRecover: {
        color: '#0cad00',
        textAlign: 'center',
        padding: '0.1rem',
        '&:hover': {
            backgroundColor: 'rgba(12,174,0,0.1)',
            borderRadius: '8px'
        }
    },
    space: {
        flexGrow: '0'
    },
    fontSize2rem: {
        fontSize: '1.1rem'
    },
    fontSize15rem: {
        fontSize: '0.8rem',
        fontWeight: 'bolder'
    },
    flexBox: {
        display: 'flex',
        overflowX: 'scroll',
        justifyContent: 'space-between',
        '&::-webkit-scrollbar': {
            display: 'none',

            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',
        }
    },
    table: {
        overflowX: 'scroll',
    },
    tableCell: {
        paddingRight: '2px',
        paddingLeft: '0px'
    },
    tableCellHeading : {
        paddingRight : 0,
        paddingLeft : 0,
        paddingBottom : 0,
        marginBottom : 0
    },
    link : {
        color : 'white'
    },
    toolbar: theme.mixins.toolbar
}));


const findLastUpdatedTime = (data) => {
    let tempDate = moment().subtract(10, 'days');
    data.forEach((state) => {
        if (moment(state['lastupdatedtime'], 'DD/MM/YYYY HH:mm:ss').isAfter(tempDate)) {
            tempDate = moment(state['lastupdatedtime'], 'DD/MM/YYYY HH:mm:ss');
        }
    });
    return moment(tempDate).format('Do, MMM HH:mm');
}

const Home = (props) => {
    const classes = useStyles();
    const { data: overview } = useSWR(COUNTRY_DATA, countryData, { revalidateOnReconnect: true });
    return (
        <Container maxWidth="md">
            <div className={classes.toolbar} />
            <Typography variant="h4" align="center">
                Overview Of Cases In India
            </Typography>
            <Typography variant="subtitle2" align="center">{overview ? `Last Updated On : ${findLastUpdatedTime(overview['statewise'])}` : ''}</Typography>
            <div className={classes.toolbar} />
            {overview ? <ShowOverview data={overview} /> : <Loading />}
            <Typography variant="subtitle1" align="right" color="error"> *Excludes Migrated/Foreign Cases</Typography>
            <Typography variant="h4" align="center">
                <div className={classes.toolbar} />
                Overview Of Cases - State Wise
            <div className={classes.toolbar} />
            </Typography>
            {overview ? <StateTable data={overview['statewise']} /> : <Loading />}
        </Container>
    );
};

const getOverview = (stateData, caseData) => {
    let finalData = {
        totalconfirmed: 0,
        totalactive: 0,
        totaldeceased: 0,
        totalrecovered: 0,
        dailyconfirmed: 0,
        dailyrecovered: 0,
        dailydeceased: 0,
    }
    let stateTotal = stateData.filter((state) => state['statecode'] === 'TT')[0];
    finalData['totalactive'] = parseInt(stateTotal['active']);
    finalData['totalconfirmed'] = parseInt(stateTotal['confirmed']);
    finalData['totaldeceased'] = parseInt(stateTotal['deaths']);
    finalData['totalrecovered'] = parseInt(stateTotal['recovered']);
    finalData['dailyconfirmed'] = parseInt(stateTotal['deltaconfirmed']);
    finalData['dailydeceased'] = parseInt(stateTotal['deltadeaths']);
    finalData['dailyrecovered'] = parseInt(stateTotal['deltarecovered']);
    return finalData;
}

const ShowAnimation = ({ data }) => {
    const classes = useStyles();
    const spring = useSpring({
        total: data,
        from: { total: 0 },
        config: {
            friction: 120,
            mass: 20,
            tension: 200
        }
    });
    return <animated.p className={classes.fontSize2rem}>{spring.total.interpolate(v => Math.floor(v))}</animated.p>
}

const ShowOverview = ({ data }) => {
    const classes = useStyles();
    let latestData = getOverview(data['statewise'], data['cases_time_series']);
    return (
        <Grid container spacing={1}>
            <Grid className={classes.boxBorderConfirm} item xs={3}>
                <ShowAnimation data={latestData.totalconfirmed} />
                <p className={classes.fontSize2rem}>Total</p>
                <p>  {latestData.dailyconfirmed > 0 ? latestData.dailyconfirmed : ''}<TrendingUpIcon /></p>
            </Grid>
            <Grid className={classes.boxBorderFatal} item xs={3}>
                <ShowAnimation data={latestData.totaldeceased} />
                <p className={classes.fontSize2rem}>Fatal</p>
                <p> {latestData.dailydeceased} <TrendingUpIcon /></p>
            </Grid>
            <Grid className={classes.space} />

            <Grid className={classes.boxBorderRecover} item xs={3}>
                <ShowAnimation data={latestData.totalrecovered} />
                <p className={classes.fontSize2rem}>Cured</p>
                <p>{latestData.dailyrecovered} <TrendingUpIcon /></p>
            </Grid>
            <Grid className={classes.space} />

            <Grid className={classes.boxBorderActive} item xs={3}>
                <ShowAnimation data={latestData.totalactive} />
                <p className={classes.fontSize2rem}>Active</p>
                <p><TrendingUpIcon /></p>
            </Grid>
        </Grid>
    );
};

const StateTable = ({ data }) => {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState('state');
    const [order, setOrder] = useState('asc');
    const [type, setType] = useState('string');
    let totalRow = data.filter((row) => row['statecode'] === 'TT')[0];
    data = stableSort(data.filter((row) => row['statecode'] !== 'TT'), getComparator(order, orderBy, type));
    const tableData = data.map((state, index) => {
        return (
            <StateTableRow key={index} data={state} index={index} />
        );
    });
    tableData.push(<StateTableRow key={46} data={totalRow} />);
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
            <Table stickyHeader={true} className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            headCells.map((headCell) => {
                                return (
                                    <TableCell key={headCell.id}
                                        align={headCell.numeric ? 'right' : 'left'}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                        onClick={() => handleClick(headCell.id, headCell.dataType)}
                                        className={classes.tableCellHeading}
                                    >
                                        <Tooltip placement="top" arrow title={headCell.label} enterTouchDelay={100}>
                                            <IconButton aria-label="Table Cell Information" >
                                                <Typography display="block" variant="caption">
                                                    {headCell.label.substr(0, 1)}
                                                </Typography>
                                            </IconButton>
                                        </Tooltip>
                                        <TableSortLabel
                                            active={orderBy === headCell.id}
                                            direction={orderBy === headCell.id ? order : 'asc'}
                                        ></TableSortLabel>
                                    </TableCell>
                                );
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const StateTableRow = ({ index, data }) => {
    const classes = useStyles();
    return (
        <TableRow hover key={index}>
            <TableCell className={classes.tableCell} style={{ "width": "20% !important" }}>
                { data.statecode !=='TT'? <Link to={"/covid-dashboard/state/" + data.statecode} className={classes.link}>
                 {data.state}
                </Link> : data.state } 
                {data.statenotes.length > 0 ?

                    <Tooltip placement="bottom" title={
                        data.statenotes.split('\n').map((note, index) => <p key={index}>{note}</p>)
                    } arrow enterTouchDelay={100}>

                        <IconButton aria-label="state notes">
                            <NotificationsActiveIcon fontSize="small" />
                        </IconButton>

                    </Tooltip>

                    : ''}
            </TableCell>
            <TableCell className={classes.tableCell}>
                {/* <p> */}
                <Typography display="block" variant="subtitle2">

                    {data.confirmed}
                </Typography>
                <Typography variant="caption" display="block">
                    {parseInt(data.deltaconfirmed) !== 0 ? <span>
                        {data.deltaconfirmed > 0 ? data.deltaconfirmed : -data.deltaconfirmed}
                        {data.deltaconfirmed > 0 ? <ArrowUpwardIcon fontSize="small" color="error" /> : <ArrowDownwardIcon style={{ color: "green" }} fontSize="small" />}
                    </span>
                        : ''}
                </Typography>
                {/* </p>                */}
            </TableCell>
            <TableCell className={classes.tableCell}>{data.migratedother}</TableCell>
            <TableCell className={classes.tableCell}>{data.active}</TableCell>
            <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2" display="block">
                    {data.deaths}
                </Typography>
                <Typography>
                    {parseInt(data.deltadeaths) !== 0 ?
                        <span>
                            {data.deltadeaths > 0 ? data.deltadeaths : -data.deltadeaths}
                            {data.deltadeaths > 0 ? <ArrowUpwardIcon fontSize="small" color="error" /> : <ArrowDownwardIcon fontSize="small" style={{ color: "green" }} />}
                        </span> : ''
                    }
                </Typography>
            </TableCell>
            <TableCell className={classes.tableCell}>
                <Typography variant="subtitle2">
                    {data.recovered}
                </Typography>
                <Typography variant="caption">
                    {
                        parseInt(data.deltarecovered) !== 0 ?
                            <span>
                                {data.deltarecovered > 0 ? data.deltarecovered : -data.deltarecovered}
                                {data.deltarecovered > 0 ? <ArrowUpwardIcon fontSize="small" style={{ color: "green" }} /> : <ArrowDownwardIcon fontSize="small" color="error" />}
                            </span> : ''
                    }
                </Typography>
            </TableCell>
            {/* <TableCell className={classes.tableCell}>{moment(data.lastupdatedtime, 'DD/MM/YYYY HH:mm:ss').format('Do MMMM, HH:mm')}</TableCell> */}
        </TableRow>
    );
}

const headCells = [
    { id: 'state', dataType: 'string', label: 'State' },
    { id: 'confirmed', dataType: 'number', label: 'Confirm' },
    { id: 'migratedother', dataType: 'number', label: 'Migrated' },
    { id: 'active', dataType: 'number', label: 'Active' },
    { id: 'deaths', dataType: 'number', label: 'Deaths' },
    { id: 'recovered', dataType: 'number', label: 'Cured' }
    // { id: 'lastupdatedtime', dataType : 'date', label: 'Last Update' }
];

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

export default Home;