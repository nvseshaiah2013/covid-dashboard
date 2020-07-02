import React from 'react';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaceIcon from '@material-ui/icons/Place';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SecurityIcon from '@material-ui/icons/Security';
import Home from '../components/HomeComponent';
import Updates from '../components/UpdatesComponent';
import Donate from '../components/DonateComponent';
import Precautions from '../components/PrecautionsComponent';
import ZonesIndia from '../components/ZonesIndiaComponent';
import DayWiseGraph from '../components/DayWiseGraphComponent';

export const list = [
    {
        value : 'Home',
        icon : <HomeIcon />,
        url : '/',
        component : Home 
    },
    {
        value : 'Statistics',
        icon : <TrendingUpIcon />,
        url : '/statistics',
        component : DayWiseGraph
    },
    {
        value : 'Zones In India',
        icon : <PlaceIcon />,
        url : '/zones',
        component : ZonesIndia
    },
    {
        value :'Updates',
        icon : <AnnouncementIcon />,
        url : '/updates',
        component : Updates
    },
    {
        value : 'Precautions',
        icon : <SecurityIcon />,
        url : '/precautions',
        component : Precautions
    },
    {
        value : 'Donate',
        icon : <AttachMoneyIcon />,
        url : '/donate',
        component : Donate
    }
];