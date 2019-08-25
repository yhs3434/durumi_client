import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 325,
  },
  media: {
    height: 200,
  },
});

export default function MyTeamCard(props) {
  const classes = useStyles();

  const {team} = props;

  const handleSelect = () => {
    props.onSelect(team._id);
  }

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleSelect}>
            <CardMedia
            className={classes.media}
            image={`${process.env.REACT_APP_SERVER_URI}/team/${team._id}/thumbnail.png`}
            title={team.profile.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {team.profile.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {team.profile.description}
                </Typography>
            </CardContent>
      </CardActionArea>
    </Card>
  );
}