import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import {Card, CardHeader, CardContent, CardMedia} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddButton from '@material-ui/icons/AddCircle';
import Badge from '@material-ui/core/Badge';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

class Notice extends Component {
    state = {
        member: [],
        meeting: [1,2],
        board: []
    }

    handleCardClick = (event) => {
        console.log(event.currentTarget.id);
        const eventId = event.currentTarget.id;
        if (Boolean(this.state[eventId])){
            this.setState({
                [event.currentTarget.id]: false
            });
            let elem = document.getElementById(eventId);
            elem.parentNode.childNodes[1].style.display = 'none';
        } else {
            this.setState({
                [event.currentTarget.id]: true
            });
            let elem = document.getElementById(eventId);
            elem.parentNode.childNodes[1].style.display = 'block';
        }
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
            },
            listItem: {
                width: '20rem'
            },
            card: {
                marginTop: "1rem",
                marginBottom: '1rem',
                width: "30rem",
                display: 'flex',
                flexDirection: 'column'
            }
        }

        return(
            <div style={style.root}>
                <div style={style.childRoot}>
                    <img alt="teamThumbnail" src={`${process.env.REACT_APP_SERVER_URI}/team/${this.props.teamSelected}/thumbnail.png`} style={style.img} />
                    <div style={style.childChildRoot}>
                        <Button variant="outlined" color="primary" style={style.button}>사진 등록</Button>
                        <Button variant="outlined" color="secondary" style={style.button}>사진 제거</Button>
                    </div>
                    <Typography>Member</Typography>
                    <div style={style.paper}>
                        <List>
                            {this.state.member.map((member, idx) => {
                                const thumbnailPath = `${process.env.REACT_APP_SERVER_URI}/account/${member._id}/thumbnail.png`;
                                return(
                                    <ListItem alignItems="flex-start" key={idx} style={style.listItem}>
                                        <ListItemAvatar>
                                            <Avatar alt={member.profile.username}
                                                src={thumbnailPath}
                                            >
                                                {
                                                    Boolean(member.profile.thumbnail)
                                                    ?member.profile.username[0][0]
                                                    :member.profile.username[0][0]
                                                }
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={member.profile.username}
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        variant="body2"
                                                        
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
                    </div>
                    <Typography>Meeting</Typography>
                    <List>
                    {
                        this.state.meeting.length===0
                        ?
                        <Typography>There is not a meetings.</Typography>
                        :
                        this.state.meeting.map((item, idx) => (
                            <ListItem key={idx}>
                                <Typography>dummy 2019-07-21 gang nam ediya</Typography>
                            </ListItem>
                        ))
                    }
                    </List>
                </div>

                <div className="board" style={style.childRoot}>
                    <Typography variant="h3">board</Typography>
                    <IconButton style={{alignSelf: 'flex-end', color: "skyblue"}}><AddButton/></IconButton>
                    <Card style={style.card}>
                        <CardHeader 
                            avatar={<Avatar>
                                D
                            </Avatar>}
                            action={
                                <React.Fragment>
                                    <IconButton>
                                        <Badge badgeContent={10} color="secondary">
                                            <FavoriteBorderIcon fontSize="medium"/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton><MoreVertIcon/></IconButton>
                                </React.Fragment>
                            }
                            title={"Title"}
                            subheader={"subheader in here"}
                        />
                        <CardContent style={{display: 'none'}}>
                            test Content 22
                        </CardContent>
                        <ExpandMoreIcon 
                            style={{alignSelf: 'center'}}
                            id={"1235"}
                            onClick={this.handleCardClick}
                        />
                    </Card>

                    <Card style={style.card}>
                        <CardHeader 
                            avatar={<Avatar>
                                D
                            </Avatar>}
                            action={
                                <React.Fragment>
                                    <IconButton>
                                        <Badge badgeContent={10} color="secondary">
                                            <FavoriteBorderIcon fontSize="medium"/>
                                        </Badge>
                                    </IconButton>
                                    <IconButton><MoreVertIcon/></IconButton>
                                </React.Fragment>
                            }
                            title={"Title"}
                            subheader={"subheader in here"}
                            id={"1234"}
                            onClick={this.handleCardClick}
                        />
                        <CardContent style={{display: 'none'}}>
                            test Content
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}

export default Notice;