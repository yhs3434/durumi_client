import React, { Component, Fragment } from 'react';
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

class Header extends Component {
    state = {
        account: {
            accountOpen: null
        }
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
            }
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
                                    Boolean(this.props.sessionObject._id)
                                    ?
                                    <IconButton>
                                        <SendIcon style={style.accountButton} fontSize='large'/>
                                    </IconButton>
                                    :
                                    ''
                                }
                                {
                                    Boolean(this.props.sessionObject._id)
                                    ? 
                                    this.props.sessionObject._id
                                    :
                                    <IconButton onClick={this.accountClick}>
                                        <AccountCircle style={style.accountButton} fontSize='large'/>
                                    </IconButton>
                                }
                                <Menu open={Boolean(this.state.account.accountOpen)} 
                                anchorEl={this.state.account.accountOpen}
                                onClose={this.accountClick}
                                style={{}}
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