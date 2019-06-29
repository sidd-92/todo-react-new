/* eslint-disable no-console */
import React from 'react';
import './App.css';
import M from 'materialize-css';
import Table from 'rc-table';
import { TODO_LIST } from './constants/todolistsample';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import moment from 'moment';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        {
          title: 'Complete Task',
          dataIndex: '',
          key: 'completeTask',
          render: (text, record, index) => (
            <div
              className="alignCheckBoxTable"
              onClick={e => this.completeTask(e, record, index)}>
              <i className="material-icons">
                {record.completed ? `check_box` : `check_box_outline_blank`}
              </i>
            </div>
          )
        },

        {
          title: 'Task',
          dataIndex: 'task',
          key: 'task_id'
        },
        {
          title: 'Done By / Everyday',
          dataIndex: 'by',
          key: 'by_id'
        },
        {
          title: 'Edit',
          dataIndex: '',
          key: 'edit',
          render: record => (
            <button
              disabled={record.completed}
              className="btn"
              onClick={e => this.handleEditTableButton(e, record)}>
              Edit
            </button>
          )
        },
        {
          title: 'Delete',
          dataIndex: '',
          key: 'delete',
          render: () => <button className="btn">Delete</button>
        }
      ],
      listOfTasksByDay: [],
      isEditable: false,
      tempText: '',
      completed: false,
      by: '',
      editTask: { index: -1 },
      edittempText: '',
      saved: false,
      deleteTask: false,
      taskToDelete: { task: '', index: -1 },
      doneEveryday: false,
      enableTableView: false
    };
    this.handleText = this.handleText.bind(this);
    this.handleDay = this.handleDay.bind(this);
    this.addToList = this.addToList.bind(this);
    this.handleEditCard = this.handleEditCard.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.handleEditText = this.handleEditText.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.enableTableViewHandler = this.enableTableViewHandler.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.handleEditTableButton = this.handleEditTableButton.bind(this);
  }

  componentDidMount() {
    this.setState({ listOfTasksByDay: TODO_LIST });
    this.getTasksAPI();
  }

  getTasksAPI() {
    axios.get(`http://localhost:9000/tasks`)
    .then(res => {
      console.log("RESULT FROM API",res);
    })
  }
  handleEditTableButton(e, record) {
    let { task, by, key } = record;
    this.setState({ isEditable: true });
  }
  handleText(e) {
    e.preventDefault();
    this.setState({ tempText: e.target.value });
  }
  handleDay(e) {
    e.preventDefault();
    this.setState({ by: e.target.value });
  }
  addToList(e) {
    e.preventDefault();
    let listOfTasksByDay = this.state.listOfTasksByDay;
    let date;
    let by = this.state.by;
    if (this.state.doneEveryday) {
      date = 'Everyday';
    } else {
      date = moment(this.state.by).format('ddd, MMM Do YY');
    }
    if (
      this.state.tempText === '' ||
      (this.state.by === '' && !this.state.doneEveryday)
    ) {
      M.toast({
        html: 'Field Cannot Be Empty',
        inDuration: '100',
        outDuration: '100',
        displayLength: '1000',
        classes: 'rounded red positionToast'
      });
    } else {
      listOfTasksByDay.push({
        task: this.state.tempText,
        by: date,
        key: this.randomString()
      });
      this.setState(
        {
          listOfTasksByDay,
          tempText: '',
          by: '',
          deleteTask: false,
          doneEveryday: false
        },
        () => console.log('All Fields Updated')
      );
    }
  }
  handleEditCard(e, tasks, i) {
    let editTask = this.state.editTask;
    editTask.index = i;
    e.preventDefault();
    console.log(tasks, i);
    this.setState({ editTask, saved: false });
  }
  completeTask(e, tasks, i) {
    let listOfTasksByDay = this.state.listOfTasksByDay;
    if (!tasks.completed) {
      listOfTasksByDay[i].completed = true;
    } else {
      listOfTasksByDay[i].completed = false;
    }
    this.setState({ listOfTasksByDay });
  }
  saveTask(e, tasks, i) {
    let listOfTasksByDay = this.state.listOfTasksByDay;
    if (this.state.edittempText !== '') {
      listOfTasksByDay[i].task = this.state.edittempText;
    }
    this.setState({ listOfTasksByDay, saved: true });
    console.log(tasks, i, this.state.edittempText);
  }

  handleEditText(e) {
    this.setState({ edittempText: e.target.value });
  }
  deleteTask(e, tasks, i) {
    let taskToDelete = this.state.taskToDelete;
    taskToDelete.task = tasks.task;
    taskToDelete.index = i;
    this.setState({ deleteTask: true, taskToDelete });
  }

  deleteCard(e, tasks, i) {
    let listOfTasksByDay = this.state.listOfTasksByDay;
    let removedElem = listOfTasksByDay.splice(i, 1);
    this.setState({ listOfTasksByDay, deleteTask: false });
    console.log(tasks, i);
  }
  enableTableViewHandler() {
    this.setState({ enableTableView: !this.state.enableTableView });
  }
  closeDialog() {
    this.setState({ isEditable: false });
  }
  randomString = () => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    return randomstring;
  };
  render() {
    return (
      <React.Fragment>
        <div className="row center-align card-panel">
          <div className="input-field col s3 m3">
            <input
              id="todo_task"
              type="text"
              value={this.state.tempText}
              onChange={e => this.handleText(e)}
              placeholder="Task To Do"
            />
          </div>
          <div className="input-field col s3 m3">
            <input
              id="by_day"
              type="date"
              value={this.state.by}
              placeholder="Enter a Date"
              disabled={this.state.doneEveryday}
              onChange={e => this.handleDay(e)}
            />
            <label htmlFor="by_day">By "Sat, Jun 15th 19"</label>
          </div>
          <div className="col s3 m3 positionEveryday">
            <p>
              <label>
                <input
                  type="checkbox"
                  checked={this.state.doneEveryday}
                  onClick={() =>
                    this.setState({
                      doneEveryday: !this.state.doneEveryday
                    })
                  }
                />
                <span>To Be Done Everyday ?</span>
              </label>
            </p>
          </div>
          <div className="input-field col s3 m3">
            <button
              className="btn btn-large red"
              onClick={e => this.addToList(e)}>
              Add Task
            </button>
          </div>
        </div>
        <div className="card-panel valign-wrapper">
          <div className="switch">
            <label>
              Enable Table View
              <input
                type="checkbox"
                disabled={this.state.listOfTasksByDay.length === 0}
                checked={this.state.enableTableView}
                onClick={this.enableTableViewHandler}
              />
              <span className="lever" />
            </label>
          </div>
        </div>
        {this.state.enableTableView ? (
          <Table columns={this.state.columns} data={TODO_LIST} />
        ) : this.state.listOfTasksByDay.length > 0 ? (
          <div className="row">
            {this.state.listOfTasksByDay.map((tasks, i) => (
              <div key={i} className="col l3 m6 s12">
                <div
                  className={`card ${
                    tasks.completed ? 'grey' : 'blue'
                  } darken-1 hoverable flow-text`}>
                  <div className="card-content white-text">
                    {this.state.editTask.index === i && !this.state.saved ? (
                      <input
                        id="todo_task"
                        type="text"
                        className="validate"
                        value={
                          this.state.edittempText === ''
                            ? this.state.tempText
                            : this.state.edittempText
                        }
                        onChange={e => this.handleEditText(e)}
                      />
                    ) : (
                      <span className="card-title">{tasks.task}</span>
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
                            tasks.completed ? 'completedText' : 'amber-text'
                          }>
                          {tasks.by}
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
                            ? 'disabled btn-flat'
                            : 'yellow-text btn-flat'
                        }
                        onClick={e => this.handleEditCard(e, tasks, i)}>
                        Edit
                      </button>
                    )}
                    {this.state.editTask.index === i && !this.state.saved ? (
                      <button
                        className=" green-text btn-flat"
                        onClick={e => this.saveTask(e, tasks, i)}>
                        Save
                      </button>
                    ) : this.state.deleteTask &&
                      this.state.taskToDelete.index === i ? (
                      <div>
                        <p>Are You Sure You Want To Delete ?</p>
                        <button
                          className="red-text btn-flat modal-trigger"
                          onClick={e => this.deleteCard(e, tasks, i)}>
                          Yes
                        </button>
                        <button
                          className="white-text btn-flat modal-trigger"
                          onClick={e => this.setState({ deleteTask: false })}>
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        className="red-text btn-flat"
                        onClick={e => this.deleteTask(e, tasks, i)}>
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
        <Dialog
          title="Edit The Task"
          visible={this.state.isEditable}
          onClose={this.closeDialog}>
          <div class="input-field">
            <input
              id="editTask"
              type="text"
              onChange={this.handleTableEdit}
              placeholder="Edit the task"
            />
          </div>
          <button class="waves-light btn-large">Save</button>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default App;
