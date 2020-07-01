import React, { useState } from 'react';
import { Container, Typography, makeStyles, Table, TableHead, TableBody, TableCell, TableRow, TableSortLabel } from '@material-ui/core';
import { COUNTRY_DATA } from '../constants/urls';
// import { STATE_NAMES } from '../constants/constants';
import { countryData } from '../resources/useData';
import useSWR from 'swr';
import Loading from './LoadingComponent';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TrendingDownIcon from '@material-ui/icons/TrendingDown'
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        fontSize: '1rem',
        lineHeight: '1rem',
        letterSpacing: '1.3px'
    },
    boxBorderConfirm: {
        border: '2px solid #000FF0',
        backgroundColor: '#000FF1',
        flexGrow: 1,
        borderRadius: '5px 3px',
        textAlign: 'center',
        // fontSize : '2rem',
        padding: '1rem',
        // fontWeight : 'bolder',
        // opacity : '0.5'
    },
    boxBorderFatal: {
        border: '2px solid #ff2424',
        backgroundColor: '#ff3838',
        flexGrow: 1,
        borderRadius: '5px 3px',
        textAlign: 'center',
        // fontSize : '2rem',
        padding: '1rem',
        // fontWeight : 'bolder',
        // opacity : '0.5'
    },
    boxBorderActive: {
        border: '2px solid #7a7a7a',
        backgroundColor: '#a0a39e',
        flexGrow: 1,
        borderRadius: '5px 3px',
        textAlign: 'center',
        // fontSize : '2rem',
        padding: '1rem',
        // fontWeight : 'bolder',
        // opacity : '0.5'
    },
    boxBorderRecover: {
        border: '2px solid #89f564',
        backgroundColor: '#0cad00',
        borderRadius: '5px 3px',
        flexGrow: 1,

        textAlign: 'center',
        // fontSize : '2rem',
        padding: '1rem',
        // fontWeight : 'bolder',
        // opacity : '0.5'
    },
    fontSize2rem: {
        fontSize: '2rem'
    },
    fontSize15rem: {
        fontSize: '1.5rem',
        fontWeight: 'bolder'
    },
    flexBox: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    toolbar: theme.mixins.toolbar
}));


const Home = (props) => {
    const classes = useStyles();
    const { data: overview } = useSWR(COUNTRY_DATA, countryData, { refreshWhenOffline: true })
    return (
        <Container maxWidth="md">
            <div className={classes.toolbar} />
            <Typography variant="h4" align="center">
                Overview Of Cases In India
            <div className={classes.toolbar} />

            </Typography>
            {overview ? <ShowOverview data={overview['cases_time_series']} /> : <Loading />}
            <Typography variant="subtitle1" align="right" color="error"> *Includes Migrated/Foreign Cases</Typography>
            <Typography variant="h4" align="center">
                <div className={classes.toolbar} />
                Overview Of Cases - State Wise
            <div className={classes.toolbar} />

            </Typography>
            {overview ? <StateTable data={overview['statewise']} /> : <Loading />}
        </Container>
    );
};

const ShowOverview = ({ data }) => {
    const classes = useStyles();
    let length = data.length;
    let latestData = data[length - 1];
    let activeCases = parseInt(latestData.totalconfirmed) - (parseInt(latestData.totalrecovered) +
        parseInt(latestData.totaldeceased));
    let dailyActiveCases = parseInt(latestData.dailyconfirmed) - (parseInt(latestData.dailyrecovered) + parseInt(latestData.dailydeceased));
    return (
        <Container maxWidth="xl" className={classes.flexBox}>
            <div className={classes.boxBorderConfirm}>
                <p className={classes.fontSize15rem}>{latestData.totalconfirmed}</p>
                <p className={classes.fontSize2rem}>Total Cases </p>
                <p> {latestData.dailyconfirmed} <TrendingUpIcon /></p>
            </div>
            <div className={classes.boxBorderFatal}>
                <p className={classes.fontSize15rem}>
                    {latestData.totaldeceased}
                </p>
                <p className={classes.fontSize2rem}>Fatalities</p>
                <p> {latestData.dailydeceased} <TrendingUpIcon /></p>
            </div>
            <div className={classes.boxBorderRecover}>
                <p className={classes.fontSize15rem}>{latestData.totalrecovered}</p>
                <p className={classes.fontSize2rem}>Recoveries</p>
                <p>{latestData.dailyrecovered} <TrendingUpIcon /></p>
            </div>
            <div className={classes.boxBorderActive}>
                <p className={classes.fontSize15rem}>{activeCases}</p>
                <p className={classes.fontSize2rem}>Active Cases</p>
                <p>{dailyActiveCases} {dailyActiveCases > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}</p>
            </div>
        </Container>);
};

const StateTable = ({ data }) => {
    // const classes = useStyles();
    const [orderBy, setOrderBy] = useState('state');
    const [order, setOrder] = useState('asc');
    const [type, setType ] = useState('string');
    data = stableSort(data,getComparator(order,orderBy,type));
    const tableData = data.map((state,index) => {
        return (
            <StateTableRow key={index} data={state} />
        );
    });
    tableData.push(<StateTableRow key={90} data={data[0]} />);
    const handleClick = (parameter,type) =>{
        if(parameter === orderBy){
            if(order ==='asc'){
                setOrder('desc');
            }
            else {
                setOrder('asc');
            }
        }else{
            setOrder('asc');
            setOrderBy(parameter); 
        }
        setType(type);
    }
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {
                        headCells.map((headCell) => {
                            return (
                                <TableCell key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    onClick={() => handleClick(headCell.id,headCell.dataType)}
                                >
                                    {headCell.label}
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
    );
}

const StateTableRow = ({ data }) => {
    // const classes = useStyles();
    return (
        <TableRow>
            <TableCell>{data.state}</TableCell>
            <TableCell>{data.confirmed}</TableCell>
            <TableCell>{parseInt(data.confirmed) - (parseInt(data.active) + parseInt(data.deaths))}</TableCell>
            <TableCell>{data.deaths}</TableCell>
            <TableCell>{data.active}</TableCell>
            <TableCell>{moment(data.lastupdatedtime, 'DD/MM/YYYY HH:mm:ss').format('Do MMMM, HH:mm A')}</TableCell>
        </TableRow>
    );
}

const headCells = [
    { id: 'state', dataType: 'string', label: 'State Name' },
    { id: 'confirmed', dataType : 'number', label: 'Confirmed' },
    { id: 'recovered', dataType : 'number', label: 'Recovered' },
    { id: 'fatalities', dataType : 'number', label: 'Fatalities' },
    { id: 'active', dataType : 'number', label: 'Active' },
    { id: 'updated', dataType : 'date', label: 'Last Updated' }
];

const descendingComparator = (a, b, orderBy, type) => {
    if(type === 'string') {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    if(type === 'number'){
        if (parseInt(b[orderBy]) < parseInt(a[orderBy])) {
            return -1;
        }
        if (parseInt(b[orderBy]) > parseInt(a[orderBy])) {
            return 1;
        }
    }
    if(type === 'date'){
        if (moment(b[orderBy],'DD/MM/YYYY HH:mm:ss').isBefore(moment(a[orderBy],'DD/MM/YYYY HH:mm:ss'))) {
            return -1;
        }
        if (moment(b[orderBy],'DD/MM/YYYY HH:mm:ss').isAfter(moment(a[orderBy],'DD/MM/YYYY HH:mm:ss'))) {
            return 1;
        }
    }
    return 0;
}

const getComparator = (order, orderBy,type) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy,type)
        : (a, b) => -descendingComparator(a, b, orderBy,type);
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