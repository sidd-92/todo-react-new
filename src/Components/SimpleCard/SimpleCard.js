import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import Tooltip from "@material-ui/core/Tooltip";
const useStyles = makeStyles(theme => ({
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
    marginBottom: 12,
    wordBreak: "break-word"
  },
  taskName: {
    wordBreak: "break-word"
  },
  button: {
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      flexGrow: 0
    }
  },
  icon: {
    color: "green"
  },
  Work: {
    color: "#3f51b5"
  },
  Personal: {
    color: "#ff5722"
  },
  Shopping: {
    color: "#00d084"
  }
}));

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
          {dueDate}
        </Typography>
        <Typography className={classes.taskName} variant="h5" component="h2">
          {taskName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {taskDescription}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          className={
            label === "Work"
              ? classes.Work
              : label === "Personal"
              ? classes.Personal
              : label === "Shopping"
              ? classes.Shopping
              : null
          }
        >
          {label === "None" ? "" : label}
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
