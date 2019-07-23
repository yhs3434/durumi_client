import React, {Component, Fragment} from 'react';
import HeaderContainer from '../header';
import HomeContent from '../page/HomeContent';
import LoginContainer from '../container/LoginContainer';
import JoinContent from '../page/JoinContent';
import FindTeamContent from '../page/FindTeamContent';
import MyTeamContent from '../page/MyTeamContent';
import TeamPage from '../page/TeamPage';
import ProfilePage from '../page/ProfilePage';
import ProfileEditPage from '../page/ProfileEditPage';
import { createMuiTheme } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import * as accountActions from '../store/modules/account';


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

    componentDidMount() {
        if (Boolean(sessionStorage.userObject) || sessionStorage.userObject === "undefined") {
            console.log('please login');
        } else {
            this.props.loginLocal({
                object: sessionStorage.userObject
            })
        }
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
                    <Route path="/match"
                        render={(props) => <FindTeamContent {...props} sessionObj={this.props.sessionObj}/>}
                    ></Route>
                    <Route exact path='/team'
                        render={(props) => <MyTeamContent {...props} sessionObj={this.props.sessionObj}/>}></Route>
                    <Route path='/enter'
                        render={(props) => <TeamPage {...props} sessionObj={this.props.sessionObj}/>}></Route>
                    <Route path='/profile'
                        render={(props) => <ProfilePage {...props} sessionObj={this.props.sessionObj} />}></Route>
                    <Route path='/edit/profile'
                        render={(props) => <ProfileEditPage {...props} sessionObj={this.props.sessionObj} />}></Route>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    sessionObj: state.account.object
})

const mapDispatchToProps = (dispatch) => ({
    loginLocal: (payload) => dispatch(accountActions.loginLocal(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);