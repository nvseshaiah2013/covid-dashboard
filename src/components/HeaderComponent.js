import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import NavbarList from './NavbarList';
import { list } from './sidenav';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            // used if we want to restrict the app bar width to leave the space for drawer
            // width: `calc(100% - ${drawerWidth}px)`, 

            // marginLeft: drawerWidth,
            width: '100%',
            marginLeft: 0
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3)
    },
    navbar : {
        marginLeft : 'auto'
    }
}));

const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Divider />
            <List>
                {list.map((item, index) => (
                    <ListItem button key={item.value}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.value} />
                    </ListItem>
                ))}
            </List>
        </div>
    );
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" className={classes.appBar} color="primary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box display={{ xs: 'none', md: 'block' }}>
                        <Typography variant="h5" style={{ "marginLeft": "5vw" }}> CovidAnalytics </Typography>
                    </Box>
                    <Box display={{ xs: 'block', md: 'none' }}>
                        <Typography variant="h5"> CovidAnalytics </Typography>
                    </Box>
                    <Box display={{xs : 'none', sm : 'block'}} className={classes.navbar}>
                        <NavbarList />
                    </Box>
                </Toolbar>
            </AppBar>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    {drawer}
                </Drawer>
            </Hidden>
        </div>
    );
};

export default Header;