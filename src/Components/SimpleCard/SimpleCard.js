import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  button: {
    flexGrow: 1
  },
  icon: {
    color: "green"
  }
});

export default function SimpleCard(props) {
  let { dueDate, taskName, taskDescription, label } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Due Date
        </Typography>
        <Typography variant="h5" component="h2">
          Todo Task
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          accumsan gravida odio id suscipit. Donec dignissim justo hendrerit,
          consequat nulla ac, pretium dui. Donec mattis augue quis diam ultrices
          tempor. Vivamus vitae eros vel sapien venenatis elementum. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus.
        </Typography>
        <Typography variant="body2" component="p">
          Label : Work, Personal, Shopping
        </Typography>
      </CardContent>
      <CardActions>
        <div className={classes.button}>
          <Button color="primary">Edit</Button>
          <Button color="secondary">Delete</Button>
        </div>
        <Tooltip title="Done With Task">
          <Button size="small">
            <DoneIcon className={classes.icon} />
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
