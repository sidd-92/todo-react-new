import React from "react";
import "./App.css";
import M from "materialize-css";
var moment = require('moment');
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfTasksByDay: [],
      tempText: "",
      completed: false,
      by:"",
      editTask: {index: -1},
      edittempText: "",
      saved: false,
      deleteTask: false,
      allDates : [],
      taskToDelete : {task:"", index:-1},
      doneEveryday: false,
    };
  }
  componentDidMount() {
    this.getAllTasks();
    this.getTasksById(1);
  }

  getAllTasks = () => {
    fetch('http://5bd27037c8f9e400130cb7d9.mockapi.io/words')
    .then(res => res.json())
    .then((data) => {
      this.setState({listOfTasksByDay: data})
    })
    .catch(console.log)
  }
  getTasksById = (id) => {
    fetch(`http://5bd27037c8f9e400130cb7d9.mockapi.io/words/${id}`)
    .then(res => res.json())
    .then((data) => {
      console.log("GEBY ID",data);
    })
    .catch(console.log)
  } 
  handleText(e) {
    e.preventDefault();
    this.setState({ tempText: e.target.value });
  }
  handleDay(e) {
    e.preventDefault();
    this.setState({by: e.target.value})
  }
  addToList(e) {
    e.preventDefault();
    let listOfTasksByDay = this.state.listOfTasksByDay;
    let date;
    let by = this.state.by;
      if(by === 'Everyday') {
        date = "Everyday";
      }
      else {
        date = moment(this.state.by).format("ddd, MMM Do YYYY");
      }
    if (this.state.tempText === "") {
      M.toast({
        html: "Field Cannot Be Empty",
        inDuration: "100",
        outDuration: "100",
        displayLength: "1000",
        classes: "rounded red positionToast"
      });
    } else {
      listOfTasksByDay.push({task: this.state.tempText, by:date});
      this.setState({ listOfTasksByDay, tempText: "", by:"", deleteTask: false, doneEveryday:false });
    }
  }
  handleEditCard(e,tasks,i) {
    let editTask = this.state.editTask;
    editTask.index = i;
    e.preventDefault();
    console.log(tasks,i);
    this.setState({ editTask, saved: false });
  }
  completeTask(e,tasks,i){
    let listOfTasksByDay = this.state.listOfTasksByDay;
    if(!tasks.completed){
      listOfTasksByDay[i].completed = true;
    } else {
      listOfTasksByDay[i].completed = false;
    }
    this.setState({listOfTasksByDay})
  }
  saveTask(e,tasks,i){
    let listOfTasksByDay = this.state.listOfTasksByDay;
    listOfTasksByDay[i].task = this.state.edittempText;
    this.setState({listOfTasksByDay, saved: true});
    console.log(tasks,i, this.state.edittempText);
  }

  handleEditText(e) {
    this.setState({edittempText: e.target.value});
  }
  deleteTask(e, tasks, i) {
    let taskToDelete = this.state.taskToDelete;
    taskToDelete.task = tasks.task;
    taskToDelete.index = i;
    this.setState({deleteTask: true, taskToDelete})
  }

  deleteCard(e,tasks,i) {
    let listOfTasksByDay = this.state.listOfTasksByDay;
    //let removedElem = listOfTasksByDay.splice(i,1);
    this.setState({listOfTasksByDay, deleteTask: false});
    console.log(tasks,i);
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="input-field col s4 m4 l4">
            <input
              id="todo_task"
              type="text"
              value={this.state.tempText}
              onChange={e => this.handleText(e)}
              placeholder="Task To Do"
            />
          </div>
          <div className="input-field col s4 m4 l4">
            <input
              id="by_day"
              type="date"
              placeholder="Enter a Date"
              disabled={this.state.doneEveryday}
              onChange={e => this.handleDay(e)}
            />
            <label htmlFor="by_day">By "7 May 19"</label>
          </div>
          <div className="col s2 m2 l2 positionEveryday">
            <p>
              <label>
                <input
                  type="checkbox"
                  onClick={() =>
                    this.setState({ doneEveryday: true, by: "Everyday" })
                  }
                />
                <span>To Be Done Everyday ?</span>
              </label>
            </p>
          </div>
          <div className="input-field col s2 m2 l2">
            <button
              className="btn-floating btn-large red"
              onClick={e => this.addToList(e)}
            >
              <i className="medium material-icons">add</i>
            </button>
          </div>
        </div>
        {this.state.listOfTasksByDay.length > 0 ? (
          <div className="row">
            {this.state.listOfTasksByDay.map((tasks, i) => (
              <div key={i} className="col l3 m6 s12" onClick={() => this.getTasksById(i+1)}>
                <div
                  className={`card ${
                    tasks.completed ? "grey" : "blue"
                  } darken-1 hoverable flow-text`}
                >
                  <div className="card-content white-text">
                    {this.state.editTask.index === i &&
                    !this.state.saved ? (
                      <input
                        id="todo_task"
                        type="text"
                        className="validate"
                        value={this.state.edittempText}
                        onChange={e => this.handleEditText(e)}
                      />
                    ) : (
                      <span className="card-title">{tasks.tasks}</span>
                    )}
                    <p>
                      <label>
                        <input
                          type="checkbox"
                          className="filled-in"
                          checked={tasks.completed}
                          onChange={e => this.completeTask(e, tasks, i)}
                        />
                        <span
                          className={
                            tasks.completed ? "completedText" : "amber-text"
                          }
                        >
                          {this.state.by === "Everyday"
                            ? moment(tasks.by).format("ddd, MMM Do YY")
                            : `Complete By ${moment(tasks.by).format("ddd, MMM Do YY")}`}
                        </span>
                      </label>
                    </p>
                  </div>
                  <div className="card-action">
                    {this.state.deleteTask &&
                    this.state.taskToDelete.index === i ? null : (
                      <button
                        href="#"
                        className={
                          tasks.completed
                            ? "disabled btn-flat"
                            : "yellow-text btn-flat"
                        }
                        onClick={e => this.handleEditCard(e, tasks, i)}
                      >
                        Edit
                      </button>
                    )}
                    {this.state.editTask.index === i &&
                    !this.state.saved ? (
                      <button
                        className=" green-text btn-flat"
                        onClick={e => this.saveTask(e, tasks, i)}
                      >
                        Save
                      </button>
                    ) : this.state.deleteTask &&
                      this.state.taskToDelete.index === i ? (
                      <div>
                        <p>Are You Sure You Want To Delete ?</p>
                        <button
                          className="red-text btn-flat modal-trigger"
                          onClick={e => this.deleteCard(e, tasks, i)}
                        >
                          Yes
                        </button>
                        <button
                          className="white-text btn-flat modal-trigger"
                          onClick={e =>
                            this.setState({ deleteTask: false })
                          }
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        className="red-text btn-flat"
                        onClick={e => this.deleteTask(e, tasks, i)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container center-align">
            <h4>Add a Task To Display Here</h4>
          </div>
        )}
      </React.Fragment>
    );
  }
}
export default App;
