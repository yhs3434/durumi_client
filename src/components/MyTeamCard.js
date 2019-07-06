import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

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

  return (
    <Card className={classes.card}>
      <CardActionArea>
            <CardMedia
            className={classes.media}
            image={team.profile.thumbnail}
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
      <CardActions>
        <Button size="small" color="primary" variant="contained">
          입장
        </Button>
      </CardActions>
    </Card>
  );
}