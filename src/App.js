import React from "react";
import SimpleAppBar from "./Components/SimpleAppBar/SimpleAppBar";
import SimpleCard from "./Components/SimpleCard/SimpleCard";
import Grid from "@material-ui/core/Grid";
import FormSection from "./Components/FormSection/Form";
import "./App.css";
import Snackbar from "@material-ui/core/Snackbar";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      tasks: []
    };
  }
  createTask = (e, task) => {
    /* 
     taskName: name,
      taskDescription: desc,
      taskLabeledAs: labelName,
      taskDueDate: selectedDate*/
    let tasks = this.state.tasks;
    tasks.push(task);
    console.log(task);
    this.setState({ openSnackBar: true });
  };
  render() {
    let { openSnackBar } = this.state;
    return (
      <React.Fragment>
        <Snackbar
          open={openSnackBar}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          onClose={() => this.setState({ openSnackBar: false })}
          autoHideDuration={1000}
          message={<span id="message-id">Added New Task</span>}
          className="snackbar"
        />
        <SimpleAppBar />
        <React.Fragment>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormSection onCreateTask={this.createTask} />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {this.state.tasks.length > 0 ? (
              this.state.tasks.map((task, i) => (
                <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                  <SimpleCard
                    dueDate={task.taskDueDate}
                    taskName={task.taskName}
                    taskDescription={task.taskDescription}
                    label={task.taskLabeledAs.label}
                  />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <h4 className="h4">There Are No Tasks</h4>
              </Grid>
            )}
          </Grid>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default App;
