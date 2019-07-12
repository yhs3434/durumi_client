import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Input from '@material-ui/icons/Input';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';

class Chat extends Component {
    state = {
        message: [],
        prevMessage: [],
        inputValue: ""
    }

    enterKey = () => {
        if(window.event.keyCode === 13) {
            this.handleInputSendClick();
        }
    }

    scrollBottom = () => {
        let obj = document.documentElement;
        obj.scrollTop = obj.scrollHeight;
    }


    messageToState = async () => {
        const teamId = this.props.teamSelected;
        const url = `${process.env.REACT_APP_SERVER_URI}/team/chat/${teamId}`;
        const result = await axios.get(url);

        if(result.statusText === 'No Content'){
            console.log('no content');
            return;
        }
        // console.log(result.data.message);
        const messageData = result.data.message;
        let chatMessage = [];
        for(let i=0; i<messageData.length; i++){
            chatMessage.push(messageData[i]);
        }
        const prevMessage = this.state.message;
        this.setState({
            message: chatMessage,
            prevMessage: prevMessage
        });
        
        this.scrollBottom();
    }

    inputToServer = async (message) => {
        const teamId = this.props.teamSelected;
        const userObject = this.props.userObject;
        if (userObject === {}){
            return;
        }
        const userId = userObject._id;
        const url = `${process.env.REACT_APP_SERVER_URI}/team/chat/${teamId}`;
        const data = {
            userId: userId,
            message: message
        }

        try {
            
            const result = await axios.post(url, data);
            console.log('inputToServer', result);
            if (result.status === 200) {
                this.messageToState();
            }
        } catch(e) {
            console.log('e', e);
        }
    }


    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }

    handleInputSendClick = () => {
        this.inputToServer(this.state.inputValue);
        this.setState({
            inputValue: ''
        })
    }

    

    componentDidMount() {
        this.messageToState();
        this.scrollBottom();
    }

    componentDidUpdate(prevProp, prevState) {
    }
    

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'column'
            },
            paper: {
                width: '800px',
                height: '800px'
            },
            input: {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            },
            fix: {
                position: 'fixed',
                bottom: '5rem',
                backgroundColor: 'white'
            },
            listItem: {
                marginTop: '1rem',
                marginBottom: '1rem',
                width: '400px',
            },
            myListItem: {
                marginTop: '1rem',
                marginBottom: '1rem',
                width: '400px',
                alignSelf: 'flex-end',
                backgroundColor: 'yellow'
            },
            chatArea: {
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '1rem'
            }
        }
        return(
            <div id='chatRoot' style={style.root}>
                <div style={style.chatArea} id="chatArea">
                    {
                        this.state.message.map((message, idx) => {
                            console.log(message);
                            if (message.userId === this.props.userObject._id) {
                                console.log('same');
                                return (
                                    <React.Fragment>
                                        <Card style={style.myListItem}>
                                            <ListItem >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        T
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={message.message}
                                                    secondary={`나 ${message.createdAt}`}
                                                />
                                            </ListItem>
                                        </Card>
                                    </React.Fragment>
                                )
                            } else {
                                console.log('different');
                                return (
                                    <React.Fragment>
                                        <Card style={style.listItem}>
                                            <ListItem >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        T
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={message.message}
                                                    secondary={`${message.userId} ${message.createdAt}`}
                                                />
                                            </ListItem>
                                        </Card>
                                    </React.Fragment>
                                )
                            }
                        })
                    }
                </div>
                <div style={style.fix}>
                    <div style={style.input}>
                        <InputBase 
                            placeholder="type your message" 
                            inputProps={{ 'aria-label': 'type your message' }}
                            multiline={true}
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            onKeyUp={this.enterKey}
                        />
                        <Button onClick={this.handleInputSendClick}><Input /></Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat;