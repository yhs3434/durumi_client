import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

class Notice extends Component {
    state = {
        member: []
    }

    getMemberList = async () => {
        const url = `${process.env.REACT_APP_SERVER_URI}/team/member/${this.props.teamSelected}`;
        const memberList = await axios.get(url);
        this.setState({
            member: memberList.data
        })
        console.log(memberList);
        return memberList;
    }

    componentDidMount() {
        this.getMemberList();
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                flexWrap: 'wrap'
            },
            childRoot: {
                display: 'inline-flex',
                flexDirection: 'column',
                alignItems: 'center'
            },
            childChildRoot: {
                display: 'inline-flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
            },
            img: {
                maxWidth: '20rem'
            },
            button: {
                margin: '0.3rem'
            },
            paper: {
                marginTop: '1rem',
                marginBottom: '1rem'
            }
        }

        return(
            <div style={style.root}>
                <div style={style.childRoot}>
                    <img src={`${process.env.REACT_APP_SERVER_URI}/team/${this.props.teamSelected}/thumbnail.png`} style={style.img} />
                    <div style={style.childChildRoot}>
                        <Button variant="outlined" color="primary" style={style.button}>사진 등록</Button>
                        <Button variant="outlined" color="secondary" style={style.button}>사진 제거</Button>
                    </div>
                </div>

                <div style={style.childRoot}>
                    <Typography>Member List</Typography>
                    <Paper style={style.paper}>
                        <List>
                            {this.state.member.map((member, idx) => {
                                const thumbnailPath = `${process.env.REACT_APP_SERVER_URI}/account/${member._id}/thumbnail.png`;
                                return(
                                    <ListItem alignItems="flex-start" key={idx}>
                                        <ListItemAvatar>
                                            <Avatar alt={member.profile.username}
                                                src={thumbnailPath}
                                            >
                                                {
                                                    Boolean(member.profile.thumbnail)
                                                    ?member.profile.username[0]
                                                    :member.profile.username[0]
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={member.profile.username}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        variant="body3"
                                                        
                                                    >
                                                        {Boolean(member.job)?member.job:'Free'}
                                                    </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                    <Typography>모임</Typography>
                </div>
            </div>
        )
    }
}

export default Notice;