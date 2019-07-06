import React, {Component, Fragment} from 'react';
import Container from '@material-ui/core/Container';
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core';
import {Restore, Favorite, LocationOn} from '@material-ui/icons';
import Icon from '@material-ui/core/Icon';
import {Notice, Album, Board, Calendar, Chat} from './teampage/';
import { Route } from 'react-router-dom';

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

    render() {
        const style = {
            root: {

            },
            bottomNavigation: {
                width: '100%'
            },
            footer: {
                position: 'absolute',
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
                            render={(props) => <Notice {...props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/album"
                            render={(props) => <Album {...props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/calendar"
                            render={(props) => <Calendar {...props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/chat"
                            render={(props) => <Chat {...props} sessionObj={this.props.sessionObj}/>}/>
                        <Route path="/enter/board"
                            render={(props) => <Board {...props} sessionObj={this.props.sessionObj}/>}/>
                    </div>
                </Container>
                <div className='footer' style={style.footer}>
                    <BottomNavigation value={this.state.value} onChange={this.handleChange} style={style.bottomNavigation}>
                        <BottomNavigationAction label="공지" value="notice" icon={<Restore />} />
                        <BottomNavigationAction label="앨범" value="album" icon={<Favorite />} />
                        <BottomNavigationAction label="일정" value="calendar" icon={<Favorite />} />
                        <BottomNavigationAction label="채팅" value="chat" icon={<LocationOn />} />
                        <BottomNavigationAction label="게시판" value="board" icon={<Icon>folder</Icon>} />
                    </BottomNavigation>
                </div>
            </Fragment>
        )
    }
}

export default TeamPage;