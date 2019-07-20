import React, {Component} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {List, ListItem, ListItemText, ListItemIcon} from '@material-ui/core';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import axios from 'axios';


class ProfilePage extends Component {
    state = {
        thumbnail: null,
        fileSelected: null,
        teamJoined: []
    }

    getMyTeam = async () => {
        if (this.props.sessionObj) {
            const path = `${process.env.REACT_APP_SERVER_URI}/team/my/${this.props.sessionObj._id}`;
            const result = await axios.get(path);
            const teamList = result.data;
            console.log(teamList);
            this.setState({
                teamJoined: teamList
            })
        }
    }

    getThumbnail = () => {
        if (this.props.sessionObj) {
            const url = `${process.env.REACT_APP_SERVER_URI}/account/${this.props.sessionObj._id}/thumbnail.png`;
            this.setState({
                thumbnail: url
            });
        }
    }

    handleChangeFile = async (event) => {
        event.preventDefault();
        const fileSelected = event.target.files[0];
        this.setState({
            fileSelected: fileSelected
        })
        if (!Boolean(fileSelected)){
            return;
        }

        let formData = new FormData();
        formData.append('file', fileSelected);
        if(this.props.sessionObj) {
            formData.append('userId', this.props.sessionObj._id)
        }

        const url = `${process.env.REACT_APP_SERVER_URI}/account/thumbnail/upload`;
        const result = await axios.post(url, formData, {
            progress: (event) => {
                if(event.lengthComputable) {
                    console.log(event.loaded + ' ' + event.total);
                }
            }
        });
    }

    handleRemoveThumbnail = async () => {
        let url = null;
        if (this.props.sessionObj) {
            url = `${process.env.REACT_APP_SERVER_URI}/account/thumbnail/${this.props.sessionObj._id}`;
        }
        if (url) {
            const result = await axios.delete(url);
        }
    }

    componentDidMount() {
        this.getThumbnail();
        this.getMyTeam();
    }

    componentDidUpdate(prevProps, prevState) {
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around'
            },
            image: {
                width: "200px",
                height: "200px",
                
            },
            childRoot: {
                display: 'inline-flex',
                flexDirection: 'column',
                marginLeft: "0.5rem",
                marginRight: "0.5rem"
            },
            childChildRoot: {
                display: 'inline-flex',
                flexDirection: 'row',
                flexWrap: 'wrap'
            },
            button: {
                marginTop: "0.2rem"
            },
            label: {
                padding: '8px 24px'
            },
            thumbnailButton: {
                padding: 0,
                marginTop: "0.4rem"
            }
        }

        return(
            <div>
                <Container>
                    <div style={style.root}>
                        <div style={style.childRoot}>
                            <img src={this.state.thumbnail} style={style.image}/>
                            <input type="file" 
                                id="fileUpload" 
                                name="file" 
                                style={{display: 'none'}} 
                                onChange={this.handleChangeFile}/>
                            <Button variant="outlined" color="primary" style={style.thumbnailButton}>
                                <label style={style.label} htmlFor="fileUpload">Upload a photo</label>
                            </Button>
                            <Button variant="outlined" color="secondary" 
                                style={style.thumbnailButton}
                                onClick={this.handleRemoveThumbnail}>
                                <label style={style.label}>Remove a photo</label>
                            </Button>
                        </div>
                        <div style={style.childRoot}>
                            <div style={style.childChildRoot}>
                                <Typography>이름</Typography>
                                <Typography>
                                {
                                    Boolean(this.props.sessionObj)
                                    ?this.props.sessionObj.profile.username
                                    :'로그인 해주세요'
                                }
                                </Typography>
                            </div>
                            <div style={style.childChildRoot}>
                                <Typography>학력</Typography>
                            </div>
                            <div style={style.childChildRoot}>
                                <Typography>전공</Typography>
                            </div>
                        </div>
                        <div style={style.childRoot}>
                            <Typography>참여중인 팀</Typography>
                            <List>
                                {this.state.teamJoined.map((item, idx) => (
                                    <ListItem>
                                        <ListItemIcon>
                                            <FavoriteBorderIcon/>
                                        </ListItemIcon>
                                        <ListItemText 
                                            primary={item.profile.name}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default ProfilePage;