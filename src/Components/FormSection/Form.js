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
import Snackbar from "@material-ui/core/Snackbar";

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
    color: "#3f51b5",
    textAlign: "initial"
  },
  Personal: {
    color: "#ff5722",
    textAlign: "initial"
  },
  Shopping: {
    color: "#00d084",
    textAlign: "initial"
  },
  filledIP: {
    textAlign: "initial"
  },
  snackbar: {
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      bottom: 30
    }
  }
}));

const FormSection = () => {
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:1024px)");
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [newLabel, handleCreateNewLabel] = React.useState("");
  let listOfLabels = ["None", "Work", "Personal", "Shopping"];
  const [listLabels, addNewLabel] = React.useState(listOfLabels);
  const [labelName, setLabel] = React.useState({
    label: "None"
  });
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  const [selectedDate, handleDateChange] = useState(new Date());
  function handleClickOpen() {
    setOpen(true);
    handleCreateNewLabel("");
  }
  function addTask() {
    let task = {
      taskName: name,
      taskDescription: desc,
      taskLabeledAs: labelName,
      taskDueDate: selectedDate
    };
    console.log(task);
    setOpenSnackBar(true);
  }
  function handleChange(event) {
    setLabel(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }
  function handleClose() {
    setOpen(false);
  }
  function resetLabels() {
    handleCreateNewLabel("");
    handleClose();
  }
  function addANewLabel() {
    if (newLabel.length > 0) {
      addNewLabel(oldLabels => [...oldLabels, newLabel]);
      //listOfLabels.push(newLabel);
      handleClose();
    }
  }

  return (
    <React.Fragment>
      <Snackbar
        open={openSnackBar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        onClose={() => setOpenSnackBar(false)}
        autoHideDuration={1000}
        message={<span id="message-id">Added New Task</span>}
        className={classes.snackbar}
      />
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
              onChange={e => setDesc(e.target.value)}
              value={desc}
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
              <Select
                value={labelName.label}
                onChange={handleChange}
                input={
                  <FilledInput
                    className={
                      labelName.label === "Work"
                        ? classes.Work
                        : labelName.label === "Personal"
                        ? classes.Personal
                        : labelName.label === "Shopping"
                        ? classes.Shopping
                        : classes.filledIP
                    }
                    name="label"
                    id="filled-age-simple"
                  />
                }
              >
                {listLabels.map(item => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
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
            <DialogTitle id="form-dialog-title">Create a New Label</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To Create a Label, Just type below:
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="createLabel"
                value={newLabel}
                onChange={e => handleCreateNewLabel(e.target.value)}
                label="Create Label"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={resetLabels} color="primary">
                Cancel
              </Button>
              <Button onClick={addANewLabel} color="primary">
                Create
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
              onClick={addTask}
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
    </React.Fragment>
  );
};

export default FormSection;
