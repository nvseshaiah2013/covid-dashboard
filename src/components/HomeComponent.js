import { Container, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@material-ui/core';
import TrendingDownIcon from '@material-ui/icons/TrendingDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import moment from 'moment';
import React, { useState } from 'react';
import useSWR from 'swr';
import { COUNTRY_DATA } from '../constants/urls';
import { countryData } from '../resources/useData';
import Loading from './LoadingComponent';

const useStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        fontSize: '1rem',
        lineHeight: '0.2rem',
        letterSpacing: '1.1px'
    },
    boxBorderConfirm: {
        border: '2px solid #000FF0',
        backgroundColor: '#000FF1',
        flexGrow: 1,
        // width: 'auto',
        borderRadius: '5px 3px',
        textAlign: 'center',
        padding: '0.1rem',
    },
    boxBorderFatal: {
        border: '2px solid #ff2424',
        backgroundColor: '#ff3838',
        flexGrow: 1,
        // width: 'auto',
        borderRadius: '5px 3px',
        textAlign: 'center',
        padding: '0.1rem',
    },
    boxBorderActive: {
        border: '2px solid #7a7a7a',
        backgroundColor: '#a0a39e',
        flexGrow: 1,
        // width: 'auto',
        borderRadius: '5px 3px',
        textAlign: 'center',
        padding: '0.1rem',
    },
    boxBorderRecover: {
        border: '2px solid #89f564',
        backgroundColor: '#0cad00',
        borderRadius: '5px 3px',
        // width: 'auto',
        textAlign: 'center',
        padding: '0.1rem',
    },
    space: {
        flexGrow : '0.2'
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
        overflowX : 'scroll',
        justifyContent: 'space-between',
        '&::-webkit-scrollbar' : {
            display : 'none',
            
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',
        }
    },
    table : {
        overflowX : 'scroll',
        // width : '100%'
    },
    tableCell : {
        paddingRight : '0',
        paddingLeft : '0'
    },
    toolbar: theme.mixins.toolbar
}));


const Home = (props) => {
    const classes = useStyles();
    const { data: overview } = useSWR(COUNTRY_DATA, countryData, { revalidateOnReconnect: true })
    return (
        <Container maxWidth="md">
            <div className={classes.toolbar} />
            <Typography variant="h4" align="center">
                Overview Of Cases In India
            </Typography>
            <Typography variant="subtitle2" align="center">{overview ? `Last Updated On : ${overview['cases_time_series'][overview['cases_time_series'].length - 1]['date']}` : ''}</Typography>
                <div className={classes.toolbar} />
            {overview ? <ShowOverview data={overview['cases_time_series']} /> : <Loading />}
            <Typography variant="subtitle1" align="right" color="error"> *Includes Migrated/Foreign Cases</Typography>
            <Typography variant="h4" align="center">
                <div className={classes.toolbar} />
                Overview Of Cases - State Wise
            <div className={classes.toolbar} />

            </Typography>
            {/* <Grid item xs={12}> */}

            {overview ? <StateTable data={overview['statewise']} /> : <Loading />}
            {/* </Grid> */}
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
            <div className={classes.space} />
            <div className={classes.boxBorderFatal}>
                <p className={classes.fontSize15rem}>
                    {latestData.totaldeceased}
                </p>
                <p className={classes.fontSize2rem}>Fatalities</p>
                <p> {latestData.dailydeceased} <TrendingUpIcon /></p>
            </div>
            <div className={classes.space} />

            <div className={classes.boxBorderRecover}>
                <p className={classes.fontSize15rem}>{latestData.totalrecovered}</p>
                <p className={classes.fontSize2rem}>Recoveries</p>
                <p>{latestData.dailyrecovered} <TrendingUpIcon /></p>
            </div>
            <div className={classes.space} />

            <div className={classes.boxBorderActive}>
                <p className={classes.fontSize15rem}>{activeCases}</p>
                <p className={classes.fontSize2rem}>Active Cases</p>
                <p>{dailyActiveCases} {dailyActiveCases > 0 ? <TrendingUpIcon /> : <TrendingDownIcon />}</p>
            </div>
        </Container>);
};

const StateTable = ({ data }) => {
    const classes = useStyles();
    const [orderBy, setOrderBy] = useState('state');
    const [order, setOrder] = useState('asc');
    const [type, setType ] = useState('string');
    let totalRow = data.filter((row) => row['statecode'] === 'TT')[0];
    data = stableSort(data.filter((row) => row['statecode'] !=='TT'),getComparator(order,orderBy,type));
    const tableData = data.map((state,index) => {
        return (
            <StateTableRow key={index} data={state} />
        );
    });
    tableData.push(<StateTableRow key={46} data={totalRow} />);
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
        <Table stickyHeader={true} className={classes.table}>
            <TableHead>
                <TableRow>
                    {
                        headCells.map((headCell) => {
                            return (
                                <TableCell key={headCell.id}
                                    align={headCell.numeric ? 'right' : 'left'}
                                    sortDirection={orderBy === headCell.id ? order : false}
                                    onClick={() => handleClick(headCell.id,headCell.dataType)}
                                    className={classes.tableCell}
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
    const classes = useStyles();
    return (
        <TableRow hover>
            <TableCell className={classes.tableCell}>{data.state}</TableCell>
            <TableCell className={classes.tableCell}>{data.confirmed}</TableCell>
            <TableCell className={classes.tableCell}>{parseInt(data.confirmed) - (parseInt(data.active) + parseInt(data.deaths))}</TableCell>
            <TableCell className={classes.tableCell}>{data.deaths}</TableCell>
            <TableCell className={classes.tableCell}>{data.active}</TableCell>
            <TableCell className={classes.tableCell}>{moment(data.lastupdatedtime, 'DD/MM/YYYY HH:mm:ss').format('Do MMMM, HH:mm')}</TableCell>
        </TableRow>
    );
}

const headCells = [
    { id: 'state', dataType: 'string', label: 'State Name' },
    { id: 'confirmed', dataType : 'number', label: 'Confirmed' },
    { id: 'recovered', dataType : 'number', label: 'Recovered' },
    { id: 'deaths', dataType : 'number', label: 'Fatalities' },
    { id: 'active', dataType : 'number', label: 'Active' },
    { id: 'lastupdatedtime', dataType : 'date', label: 'Last Updated' }
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