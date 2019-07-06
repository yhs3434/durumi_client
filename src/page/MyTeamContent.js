import React, {Component} from 'react';
import axios from 'axios';
import MyTeamCard from '../components/MyTeamCard';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

class MyTeamContent extends Component {
    state = {
        myTeamList: []
    }

    

    getMyTeam = async (flag) => {
        if (flag===true){
            const myTeamList = await axios.get("http://localhost:30001/team/my/"+this.props.sessionObj._id);
            if (myTeamList.status === 200){
                return myTeamList.data;
            }
            else{
                return [];
            }
        }
        else {
            return [];
        }
    }
    
    componentDidMount() {
        const result = this.getMyTeam(Boolean(this.props.sessionObj._id));
        result.then((res)=>{
            this.setState({
                myTeamList: [...this.state.myTeamList, ...res]
            });
        }).catch((e)=>{console.log('MyTeamContent.js', e)})
    }

    render() {
        const style = {
            root: {
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center'
            },
            item: {
                margin: '2rem'
            }
        }

        return (
            <Container>
                MyTeam
                <div style={style.root}>
                    {this.state.myTeamList.map((team, idx) => (
                        <Box style={style.item}>
                            <MyTeamCard team={team} />
                        </Box>
                    )
                    )}
                </div>
            </Container>
        )
    }
}

export default MyTeamContent;