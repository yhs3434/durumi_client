import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from "@material-ui/icons/MoreVert";

class HomeContent extends Component {
    state = {
        _id: ''
    }

    componentDidMount() {
        const _id = window.sessionStorage.getItem('durumi_id');

        this.setState({
            _id: _id
        })
    }

    render() {
        let {drawerOpen, drawerWidth} = this.props;

        const style = {
            card: {
                maxWidth: "550px",
                marginTop: "50px",
                marginBottom: "50px",
                marginLeft: "auto",
                marginRight: "auto",

                avatar: {
                    backgroundColor: red[500],
                    flexGrow: 1
                },
                media: {
                },
                header: {
                    display: 'flex',
                    flexDirection: 'row'
                }
            }
        }

        return(
            <div>
                <Paper>
                    <Typography variant="h5" component="h3">
                        두루미 테스트 두루미 테스트 {drawerOpen.toString()} {this.state._id}
                    </Typography>
                    <Typography component="p">
                        Paper can be used to build surface or other elements for your application.
                    </Typography>
                </Paper>
                <Box>
                    <Card style={style.card}>
                        <CardHeader
                        avatar={
                            <Avatar style={style.card.avatar}>D</Avatar>
                        }
                        action={
                            <IconButton aria-label="Settings">
                              <MoreVertIcon />
                            </IconButton>
                          }
                        title={<Typography>두루미 테스트</Typography>}
                        subheader={"June 27th, 2019"}
                        style={style.card.header}
                        >
                        </CardHeader>

                        <CardMedia
                        component='img'
                        style={style.card.media}
                        image="/images/KakaoTalk_20190624_000907452.jpg"
                        height="100%"
                        >
                        </CardMedia>

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                두루미
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                안녕하세요 내 이름은 두루미에요~ ㅎㅁㅎㅁㅎㅁㅎㅁㅎㅁㅎㅁㅎ
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
            </div>
        )
    }


    
}

export default HomeContent;