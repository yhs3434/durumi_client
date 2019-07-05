import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Modal from '@material-ui/core/Modal';
import { Typography } from '@material-ui/core';
import TeamListModal from '../components/TeamListModal';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import TeamCreateModalContainer from '../container/TeamCreateModalContainer';

class FindTeamContent extends Component {
    state = {
        modalOpen: false,
        createModalOpen: false,
        teamObject: []
    }

    handleModalClick = (idx) => {
        const key = 'key'+idx;
        this.setState({
            [key]: {
                modalOpen: true
            }
        })
    }

    handleModalClose = (idx) => {
        const key = 'key'+idx;
        this.setState({
            [key]: {
                modalOpen: false
            }
        })
    }

    handleCreateModalClick = () => {
        this.setState({
            createModalOpen: !this.state.createModalOpen
        });
    }

    componentDidMount = async () => {
        console.log('mounted');
        const teamList = await axios.get('http://localhost:30001/team/all');

        this.setState({
            teamObject: [...this.state.teamObject, ...teamList.data]
        })
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                marginLeft: '1rem',
                marginRight: '1rem',
                column: 'row',
                flexWrap: 'wrap-reverse',
                justifyContent: 'space-around'
            },
            left: {
                display: 'inline-flex',
                flex: 6,
                flexDirection: 'column',
                marginLeft: '1rem',
                marginRight: '1rem',
                marginTop: '2rem',
                marginBottom: '2rem',
                alignItems: 'center'
            },
            right: {
                display: 'inline-flex',
                flex: 4,
                flexDirection: 'column',
                marginLeft: '1rem',
                marginRight: '1rem',
                marginTop: '2rem',
                marginBottom: '2rem',
                alignItems: 'center'
            },
            listItem: {
                width: '25rem',
                maxWidth: '1000px',
                
            },
            avatar: {
                width: 60,
                height: 60,
                marginRight: '2rem'
            },
            filterButtons: {
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'space-arround'
            },
            filterButton: {
                margin: '1rem'
            },
            typography: {
                width: '5rem',
                margin: '1rem auto'
            }
        };

        const object = {
            profile: {
                name: '두루미',
                description: '두루미테스트',
                thumbnail: '/images/KakaoTalk_20190702_185040847.jpg'
            },
            member: ['사랑이','두루미'],
            createdAt: '2019-07-02'
        }
        const object2 = {
            profile: {
                name: '사랑이',
                description: '사랑이테스트',
                thumbnail: '/images/KakaoTalk_20190531_172638815.jpg'
            },
            member: [],
            createdAt: '2019-07-02'
        }

        return (
            <div style={style.root}>
                <div style={style.left}>
                    <Paper>
                        <Typography variant="h5" style={style.typography}>전체 팀</Typography>
                        <List>
                            {this.state.teamObject.map((obj, idx) => (
                                <React.Fragment key={idx}>
                                    <Button id={idx} onClick={()=>{
                                        return this.handleModalClick(idx)
                                    }}>
                                        <ListItem style={style.listItem}>
                                            <ListItemAvatar>
                                                <Avatar src={obj.profile.thumbnail} style={style.avatar}/>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary= {obj.profile.name}
                                                secondary={obj.profile.description}
                                            /> 
                                        </ListItem>
                                    </Button>
                                    
                                    <TeamListModal
                                        modalOpen={this.state['key'+idx]?this.state['key'+idx].modalOpen:false}
                                        modalClick={()=>this.handleModalClick(idx)}
                                        modalClose={()=>this.handleModalClose(idx)}
                                        modalObj = {obj}
                                    />
                                </React.Fragment>
                            ))}
                        </List>
                    </Paper>
                </div>

                <div style={style.right}>
                    <Paper>
                        <Typography variant='h6' style={style.typography}>Filter</Typography>
                        <div style={style.filterButtons}>
                            <Button 
                            variant='contained' 
                            color='primary' 
                            size='large'
                            style={style.filterButton}>자동 매칭</Button>
                            <Button 
                            variant='contained' 
                            color='secondary' 
                            size='large'
                            onClick={this.handleCreateModalClick}
                            style={style.filterButton}>팀 만들기</Button>
                        </div>
                    </Paper>
                </div>
                <React.Fragment>
                    <TeamCreateModalContainer
                    onHistory={this.props.history}
                    modalOpen={this.state.createModalOpen}
                    modalClick={this.handleCreateModalClick}
                    />
                </React.Fragment>
            </div>
        )
    }
}

export default FindTeamContent;