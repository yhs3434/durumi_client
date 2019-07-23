import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import DurumiDrawer from './DurumiDrawer';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/SendRounded';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import RunIcon from '@material-ui/icons/DirectionsRun';

class Header extends Component {
    state = {
        account: {
            accountOpen: null
        },
        accountOpenLogin: null
    }

    handleLogout = () => {
        this.props.handleLogout();
    }

    accountClick = (e) => {
        if (this.state.account.accountOpen === null) {
            this.setState({
                account: {
                    accountOpen: e.currentTarget
                }
            });
        } else {
            this.setState({
                account: {
                    accountOpen: null
                }
            });
        }
    }

    accountLoginClick = (e) => {
        if (this.state.accountOpenLogin === null) {
            this.setState({
                accountOpenLogin: e.currentTarget
            });
        } else {
            this.setState({
                accountOpenLogin: null
            });
        }
    }

    render() {
        const theme = createMuiTheme();

        const style = {
            root: {
                display: 'flex'
            },
            accountButton: {
                color: 'white'
            },
            menu: {
                button: {
                    backgroundColor: 'transparent',
                    color: 'white'  
                },
                box: {
                    marginRight: '1rem'
                }
            },
            container: {
                parent: {
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flexGrow: 1
                },
                child: {
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: 1
                },
                child2: {
                    display: 'flex',
                    alignItems: 'center',
                },
            },
            appBar: {
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            appBarShift: {
                width: `calc(100% - ${240}px)`,
                background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
            typography: {
                marginLeft: '1rem'
            },
            menuList: {
                border: '1px solid #d3d4d5'
            }
        }

        let thumbnailPath = '';
        if (this.props.sessionObject) {
            thumbnailPath = `${process.env.REACT_APP_SERVER_URI}/account/${this.props.sessionObject._id}/thumbnail.png`;
        }

        return (
            <div style={style.root}>
                <CssBaseline/>
                <AppBar position="fixed" style={this.props.drawerOpen ? style.appBarShift : style.appBar}>
                    <Toolbar>
                        <div style={style.container.parent}>
                            <div style={style.container.child}>
                                <IconButton aria-label="Open drawer" onClick={this.props.drawerClick}>
                                    <MenuIcon style={style.menu.button}/>
                                </IconButton>
                                
                                <Typography variant='h5' style={style.typography}>
                                    DURUMI
                                </Typography>
                                
                            </div>
                            <div style={style.container.child2}>
                                {
                                    Boolean(this.props.sessionObject)
                                    ?
                                    <IconButton>
                                        <SendIcon style={style.accountButton} fontSize='large'/>
                                    </IconButton>
                                    :
                                    ''
                                }
                                {
                                    Boolean(this.props.sessionObject)
                                    ? 
                                    <React.Fragment>
                                        <Button onClick={this.accountLoginClick}>
                                            <Avatar src={thumbnailPath} />
                                        </Button>
                                        
                                        <Menu 
                                            open={Boolean(this.state.accountOpenLogin)}
                                            anchorEl={this.state.accountOpenLogin}
                                            getContentAnchorEl={null}
                                            anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                            }}
                                            onClose={this.accountLoginClick}
                                            onClick={this.accountLoginClick}
                                            style={style.menuList}
                                        >
                                            <RouterLink to="/profile">
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <PersonIcon/>
                                                    </ListItemIcon>
                                                    <ListItemText primary="Profile"/>
                                                </MenuItem>
                                            </RouterLink>
                                            <MenuItem onClick={this.handleLogout}>
                                                <ListItemIcon>
                                                    <RunIcon />
                                                </ListItemIcon>
                                                <ListItemText primary="Logout"/>
                                            </MenuItem>
                                        </Menu>
                                    </React.Fragment>
                                    :
                                    <IconButton onClick={this.accountClick}>
                                        <AccountCircle style={style.accountButton} fontSize='large'/>
                                    </IconButton>
                                }
                                <Menu open={Boolean(this.state.account.accountOpen)} 
                                    anchorEl={this.state.account.accountOpen}
                                    getContentAnchorEl={null}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                    onClose={this.accountClick}
                                    onClick={this.accountClick}
                                    style={style.menuList}
                                >
                                    <RouterLink to="/login"><MenuItem>SIGN IN</MenuItem></RouterLink>
                                    <RouterLink to="/join"><MenuItem>SIGN UP</MenuItem></RouterLink>
                                    <Divider/>
                                    <MenuItem>Profile</MenuItem>
                                    <MenuItem>My account</MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
                
                <DurumiDrawer drawerOpen={this.props.drawerOpen} drawerClick={this.props.drawerClick}/>
            </div>
        )
    }
}

export default Header;