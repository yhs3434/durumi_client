import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

export default function DurumiDrawer({drawerOpen, drawerClick}) {
    const classes = useStyles();
    const theme = useTheme();

    return(
        <div className="durumiDrawer">
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                classes={{
                paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                <IconButton onClick={drawerClick}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
                </div>
                <Divider />
                <List>
                    <Link to="/">
                        <ListItem button key={0}>
                            <ListItemIcon><InboxIcon /></ListItemIcon>
                            <ListItemText primary={'홈'} />
                        </ListItem>
                    </Link>
                    <ListItem button key={1}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'매칭'} />
                    </ListItem>
                    <ListItem button key={2}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        <ListItemText primary={'내 그룹'} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                {['Setting'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
                </List>
            </Drawer>
        </div>
    )
}