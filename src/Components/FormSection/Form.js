import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: "100%"
  },
  button: {
    margin: theme.spacing(2),
    width: "190px",
    height: "50px",
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      width: "60px",
      height: "60px",
      bottom: theme.spacing(1),
      right: theme.spacing(1),
      zIndex: 2
    }
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

const FormSection = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1024px)");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            id="outlined-name"
            onChange={e => setName(e.target.value)}
            value={name}
            label="Task Name"
            className={classes.NametextField}
            margin="normal"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <TextField
            id="outlined-name"
            label="Task Description"
            multiline
            rowsMax="4"
            className={classes.textField}
            margin="normal"
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-simple">Label</InputLabel>
            <Select input={<FilledInput name="label" id="filled-age-simple" />}>
              <MenuItem value={0}>
                <em>None</em>
              </MenuItem>
              <MenuItem className={classes.Work} value={10}>
                Work
              </MenuItem>
              <MenuItem className={classes.Personal} value={20}>
                Personal
              </MenuItem>
              <MenuItem className={classes.Shopping} value={30}>
                Shopping
              </MenuItem>
            </Select>
            <FormHelperText>
              <Link onClick={handleClickOpen} className={classes.link}>
                Create a New Label
              </Link>
            </FormHelperText>
          </FormControl>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address
              here. We will send updates occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} sm={6} lg={2}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              fullWidth
              margin="normal"
              disablePast={true}
              inputVariant="filled"
              value={selectedDate}
              onChange={date => handleDateChange(date)}
              id="mui-pickers-date"
              label="Date picker"
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item lg={2}>
          <Fab
            size="large"
            variant={!matches ? "extended" : "round"}
            color="secondary"
            aria-label="add"
            className={classes.button}
          >
            <AddIcon /> {!matches ? "Add Task" : ""}
          </Fab>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FormSection;
