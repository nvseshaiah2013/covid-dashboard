import React from 'react';
import { makeStyles, ListItemIcon } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { list } from './sidenav';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    navStyle: {
        display: 'flex',
    },
    listItem : {
        width : 'auto'
    },
    listItemIcon : {
        marginLeft : '1em',
        color:'white'
    },
    listItemText : {
        borderBottom : '2px solid transparent',
        '&:hover' : {
            borderBottom : '2px solid white'
        }
    },
    navLink : {
        textDecoration : 'none',        
        color : 'white',
        opacity : '0.8'
        
    },
    activeNavLink : {
        opacity : '1'
    }
}));

const NavbarList = (props) => {
    const classes = useStyles();
    const navlist = list.map((item,index) =>{
        return (
            <NavLink exact to={item.url} key={item.url} className={classes.navLink} activeClassName={classes.activeNavLink}>
                <ListItem button key={item.value} disableGutters className={classes.listItem}>
                    <ListItemText className={classes.listItemText}>{item.value}</ListItemText>
                    <ListItemIcon className={classes.listItemIcon}>{item.icon}</ListItemIcon>
                </ListItem>
            </NavLink>
        );
    });
    return (
        <List component="ul" className={classes.navStyle}>
            {navlist}
        </List>
    );
}

export default NavbarList;