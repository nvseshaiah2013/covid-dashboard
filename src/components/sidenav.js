import React from 'react';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PlaceIcon from '@material-ui/icons/Place';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import SecurityIcon from '@material-ui/icons/Security';

export const list = [
    {
        value : 'Home',
        icon : <HomeIcon />,
        url : '/'
    },
    {
        value : 'Day Wise Graph',
        icon : <TrendingUpIcon />,
        url : '/day-graph'
    },
    {
        value : 'Zones In India',
        icon : <PlaceIcon />,
        url : '/zones'
    },
    {
        value :'Announcements',
        icon : <AnnouncementIcon />,
        url : '/announcements'
    },
    {
        value : 'Precautions',
        icon : <SecurityIcon />,
        url : '/precautions'
    },
    {
        value : 'Donate',
        icon : <AttachMoneyIcon />,
        url : '/donate'
    }
];