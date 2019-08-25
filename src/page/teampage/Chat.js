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
        ws: null,
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

    waitForSocketConnection = (socket, callback) => {
        setTimeout(
            () => {
                if(socket.readyState === 1) {
                    if (callback!=null) {
                        callback();
                    }
                } else {
                    this.waitForSocketConnection(socket, callback);
                }
            }
        , 5);
    }

    connectWebSocket = () => {
        if(Boolean(this.props.teamSelected)) {
            const path = `${process.env.REACT_APP_WEBSOCKET_URI}/${this.props.teamSelected}`;
            const ws = new WebSocket(path);
            ws.onopen = () => {
                console.log('websocket is connected');
            }
            ws.onmessage = (message) => {
                this.setState({
                    message: this.state.message.concat(message.data)
                });
            };
            ws.onclose = () => {
                console.log('websocket is disconnected');
            }
            
            this.waitForSocketConnection(ws, () => {
                if(Boolean(this.state.ws)){
                    this.state.ws.send(`${Date.now()}_$_${this.props.userObject._id}_$_${this.props.teamSelected}_$_${'init'}_$_t`);
                }
            });
            
            this.setState({
                ws: ws
            });
        }
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
        // this.inputToServer(this.state.inputValue);
        if(Boolean(this.state.ws) && this.state.ws.readyState === 1) {
            this.state.ws.send(`${Date.now()}_$_${this.props.userObject._id}_$_${this.props.teamSelected}_$_${this.state.inputValue}_$_t`);
        }
        this.setState({
            inputValue: ''
        })
    }

    

    componentDidMount() {
        this.connectWebSocket();
        this.scrollBottom();
    }

    componentDidUpdate(prevProp, prevState) {
    }

    componentWillUnmount() {
        if(Boolean(this.state.ws)) {
            this.state.ws.close();
        }
        this.setState({
            ws: null
        })
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
                            const messageArray = message.split('_$_');
                            const messageTime = messageArray[0];
                            const messageUser = messageArray[1];
                            const messageData = messageArray[3];
                            if (messageUser === this.props.userObject._id) {
                                
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
                                                    primary={messageData}
                                                    secondary={`나 ${messageTime}`}
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
                                                    primary={messageData}
                                                    secondary={`${messageUser} ${messageTime}`}
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