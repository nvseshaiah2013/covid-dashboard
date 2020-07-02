import React, { useState } from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
import { Bar, Pie } from 'react-chartjs-2';
import { COUNTRY_DATA } from '../constants/urls';
import { countryData } from '../resources/useData';
import useSWR from 'swr';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '0 auto'
    },
    toolbar: theme.mixins.toolbar,
    tooltip: {
        position: 'relative',
        width : 'fit-content',
        backgroundColor : 'black',
        '&::after': {
            content: '" "',
            position: 'absolute',
            top: '100%',
            left: '50%',
            marginLeft: '-5px',
            borderWidth: '5px',
            borderStyle: 'solid',
            borderColor: 'black transparent transparent transparent'
        }
    },
    tooltiptext: {
        color: 'white',
        textAlign: 'left',
        padding: '5px 0',
    },
    span: {
        width: '1rem',
        height: '1rem',
        display: 'block'
    }
}));

const DayWiseGraph = () => {
    const classes = useStyles();
    const { data: dayWiseData } = useSWR(COUNTRY_DATA, countryData, { refreshWhenOffline: true });
    var dayWiseDataFiltered = [];
    var pieData = [];
    if (dayWiseData) {
        dayWiseDataFiltered = dayWiseData['cases_time_series'].filter((day) => moment(day['date'], 'DD MMM ').isAfter(moment('02-03-2020', 'DD-MM-YYYY')));
        let tempData = dayWiseData['cases_time_series'][dayWiseData['cases_time_series'].length - 1];
        pieData.push(parseInt(tempData['totalconfirmed']));
        pieData.push(parseInt(tempData['totaldeceased']));
        pieData.push(parseInt(tempData['totalrecovered']));
    }
    return (
        <Container maxWidth="md" className={classes.root}>
            <div className={classes.toolbar} />
            <Typography variant="h4" align="center"> Day Wise Statistics </Typography>
            <div className={classes.toolbar} />
            {dayWiseData ? <ShowChart data={dayWiseDataFiltered} parameter={'dailyconfirmed'}
                label={'Daily Confirmed Cases - India'}
                backgroundColor={'rgba(255,10,10,0.8)'}
                borderColor={'rgb(255,10,10)'} /> : ''}
            <div className={classes.toolbar} />
            {dayWiseData ? <ShowChart data={dayWiseDataFiltered} parameter={'dailyrecovered'}
                label={'Daily Recovered Cases - India'}
                backgroundColor={'rgba(10,255,10,0.8)'}
                borderColor={'rgb(10,255,10)'} /> : ''}
            <div className={classes.toolbar} />
            {dayWiseData ? <ShowChart data={dayWiseDataFiltered} parameter={'dailydeceased'}
                label={'Daily Fatal Cases - India'}
                backgroundColor={'rgba(200,10,100,0.8)'}
                borderColor={'rgb(200,10,100)'} /> : ''}
            <div className={classes.toolbar} />
            {dayWiseData ? <ShowPieChart data={pieData} labels={['Active Cases', 'Fatal Cases', 'Recovered Cases']} /> : ''}
            <div className={classes.toolbar} />
        </Container>
    );
}

const ShowChart = ({ data, parameter, label, backgroundColor, borderColor }) => {
    let chartData = {
        labels: data.map((day) => day['date']),
        datasets: [
            {
                label: label,
                data: data.map((day) => day[parameter]),
                backgroundColor: data.map((day) => backgroundColor),
                borderColor: data.map((day) => borderColor),
                borderWidth: 1,
                hoverBackgroundColor: 'white',
                hoverBorderColor: 'white'
            }
        ]
    };
    return (<Bar data={chartData} width={100} height={50} options={{ maintainAspectRatio: true }} />);
}

const ShowPieChart = ({ data, labels }) => {
    const classes = useStyles();
    let pieData = [];
    const sum = data[0];
    let [open, setOpen] = useState(false);
    let [tooltip, setTooltip] = useState({
        top: 0,
        left: 0,
        percent: 0.0,
        value: 0,
        color: '',
        label: ''
    });
    pieData.push(data[0] - (data[1] + data[2]));
    pieData.push(data[1]);
    pieData.push(data[2]);
    let _chartRef = React.createRef();
    let chart = {
        labels: labels,
        datasets: [
            {
                label: 'Distribution of Cases Status',
                data: pieData,
                backgroundColor: ['red', 'orange', 'green'],
                borderColor: ['red', 'orange', 'green'],
                borderWidth: 1
            }
        ]
    }
    const setPositionAndData = (top, left, percent, value, color, label) => {
        setTooltip({
            color: color, top: top, left: left, label: label,
            percent: percent, value: value
        });
        setOpen(true);
        setTimeout(()=>setOpen(false),2000);
    }
    return (
        <Container maxWidth="sm">
            <Pie width={30} height={30} data={chart} ref={_chartRef} options={{
                tooltips: {
                    enabled: false,
                    // mode : 'x',
                    intersect: false,
                    custom: (tooltipModel) => {
                        chart = _chartRef.current;
                        if (!chart) {
                            return;
                        }
                        if (tooltipModel.opacity === 0) {
                            return;
                        }

                        const position = chart.chartInstance.canvas.getBoundingClientRect();
                        const left = tooltipModel.caretX;
                        const top = position.top - tooltipModel.caretY;
                        const color = tooltipModel.labelColors[0].backgroundColor;
                        const label = tooltipModel.body[0]['lines'][0].split(':')[0];
                        const value = parseInt(tooltipModel.body[0]['lines'][0].split(':')[1]);
                        const percent = (value * 100 / sum);
                        setPositionAndData(top, left, percent, value, color, label);
                    }
                }
            }} />
            <div hidden={!open} className={classes.tooltip} style={{ top: tooltip.top, left: tooltip.left }}>
                
                <p className={classes.tooltiptext}> <span className={classes.span} style={{ backgroundColor: tooltip.color }}></span>{tooltip.label}</p>
                <p className={classes.tooltiptext}> Percentage : {parseFloat(tooltip.percent).toFixed(2)} % Cases </p>
                <p className={classes.tooltiptext}> Cases : {tooltip.value}</p>
            </div>
        </Container>
    );
}

export default DayWiseGraph;