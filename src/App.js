import React, { useState } from "react";
import SimpleAppBar from "./Components/SimpleAppBar/SimpleAppBar";
import SimpleCard from "./Components/SimpleCard/SimpleCard";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Select from "@material-ui/core/Select";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(2)
  },
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
    [theme.breakpoints.down("md")]: {
      position: "fixed",
      bottom: theme.spacing(1),
      right: theme.spacing(1)
    }
  }
}));

let App = () => {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <React.Fragment>
      <SimpleAppBar />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <TextField
                    autoComplete={false}
                    id="outlined-name"
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <TextField
                    autoComplete={false}
                    id="outlined-name"
                    label="Name"
                    multiline
                    rowsMax="4"
                    className={classes.textField}
                    margin="normal"
                    variant="filled"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={3}>
                  <FormControl variant="filled" className={classes.formControl}>
                    <InputLabel htmlFor="filled-age-simple">Age</InputLabel>
                    <Select
                      input={<FilledInput name="age" id="filled-age-simple" />}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3} lg={2}>
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
                <Grid item>
                  <Fab
                    size="large"
                    color="secondary"
                    aria-label="add"
                    className={classes.button}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <SimpleCard />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default App;
