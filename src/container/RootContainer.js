import React, {Component, Fragment} from 'react';
import HeaderContainer from '../header';
import HomeContent from '../contents/HomeContent';
import LoginContainer from '../container/LoginContainer';
import JoinContent from '../contents/JoinContent';
import FindTeamContent from '../contents/FindTeamContent';
import MyTeamContent from '../contents/MyTeamContent';
import { createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';


class RootContainer extends Component {
    state = {
        drawerWidth: 240,
        drawerOpen: false
    };

    handleDrawerClick = () => {
        this.setState({
          drawerOpen: !this.state.drawerOpen
        });
    }
    
    render() {
        const theme = createMuiTheme();
        const style = {
            backgroundColor: 'green',
            marginLeft: `${this.state.drawerWidth}px`,
            content: {
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
            },
            contentShift: {
                width: `calc(100% - ${this.state.drawerWidth}px)`,
                marginLeft: `${this.state.drawerWidth}px`,
                transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }
        }

        return (
            <Fragment>
                <div className="header">
                    <HeaderContainer drawerOpen={this.state.drawerOpen} drawerClick={this.handleDrawerClick} drawerWidth={this.state.drawerWidth}/>
                </div>
                <div className="content" style={this.state.drawerOpen ? style.contentShift : style.content}>
                    <Route exact path="/" render={()=><HomeContent drawerWidth={this.state.drawerWidth} drawerOpen={this.state.drawerOpen}/>}></Route>
                    <Route path="/login" component={LoginContainer}></Route>
                    <Route path="/join" component={JoinContent}></Route>
                    <Route path="/match" component={FindTeamContent}></Route>
                    <Route path='/team' component={MyTeamContent}></Route>
                </div>
            </Fragment>
        );
    }
}

export default RootContainer;