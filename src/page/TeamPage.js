import React, {Component, Fragment} from 'react';
import Container from '@material-ui/core/Container';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Notice, Album, Board, Calendar, Chat} from './teampage/';
import { Route } from 'react-router-dom';
import DateRange from '@material-ui/icons/DateRange';
import Home from '@material-ui/icons/HomeOutlined';
import ChatIcon from '@material-ui/icons/Forum';
import Collections from '@material-ui/icons/Collections'
import Dashboard from '@material-ui/icons/Dashboard';
import {connect} from 'react-redux';

class TeamPage extends Component {
    state = {
        value: 'notice'
    }

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        });
        this.props.history.push('/enter/'+newValue);
    }

    componentDidMount() {
        this.props.history.push('/enter/'+this.state.value);
    }

    render() {
        const style = {
            root: {
                marginBottom: '5rem'
            },
            bottomNavigation: {
                width: '100%'
            },
            footer: {
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                height: '4rem'
            },
            bottomNavigation: {
                height: '100%',
                background: 'linear-gradient(45deg, #2196f3 30%, #20cbf3 90%)'
            }
        }

        return (
            <Fragment>
                <Container>
                    <div style={style.root}>
                        <Route path="/enter/notice"
                            render={(props) => <Notice {...this.props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/album"
                            render={(props) => <Album {...this.props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/calendar"
                            render={(props) => <Calendar {...this.props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/chat"
                            render={(props) => <Chat {...this.props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/board"
                            render={(props) => <Board {...this.props} sessionObj={this.props.sessionObj}/>}/>
                    </div>
                </Container>
                <div className='footer' style={style.footer}>
                    <BottomNavigation value={this.state.value} onChange={this.handleChange} style={style.bottomNavigation}>
                        <BottomNavigationAction label="공지" value="notice" icon={<Home />} />
                        <BottomNavigationAction label="앨범" value="album" icon={<Collections />} />
                        <BottomNavigationAction label="일정" value="calendar" icon={<DateRange />} />
                        <BottomNavigationAction label="채팅" value="chat" icon={<ChatIcon />} />
                        <BottomNavigationAction label="게시판" value="board" icon={<Dashboard />} />
                    </BottomNavigation>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        userObject: state.account.object,
        teamSelected: state.team.teamSelected
    })
}

export default connect(mapStateToProps)(TeamPage);