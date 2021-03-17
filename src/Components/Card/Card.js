import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: 450,
        margin: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function SimpleCard(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.flight_number}
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.mission_name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {new Date(props.launch_date_local).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" component="p">
                    {props.details}
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => props.openDetails(props.flight_number)}>Learn More</Button>
            </CardActions>
        </Card>
    );
}
