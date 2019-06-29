//Step 1 : import Express
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Task = require("../models/task");

//Get All Tasks
router.get("/", (req, res, next) => {
  Task.find()
    .select("taskName dueDate isComplete isEveryday")
    .then(result => {
      const response = {
        count: result.length,
        allTasks: result
      };
      res.status(200).json(response);
    })
    .catch(err => console.log(err));
});

//POST Task
router.post("/", (req, res, next) => {
  const newTask = new Task({
    _id: new mongoose.Types.ObjectId(),
    taskName: req.body.taskName,
    dueDate: req.body.dueDate,
    isComplete: req.body.isComplete,
    isEveryday: req.body.isEveryday
  });
  newTask
    .save()
    .then(result => {
      console.log(result);
      if (result) {
        res.status(201).json({
          message: "POST MESSAGE",
          createdTasks: result
        });
      } else {
        res.status(404).json({
          message: "No Valid Entry Found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Get a Single Task
router.get("/:taskID", (req, res, next) => {
  const id = req.params.taskID;
  Task.findById(id)
    .exec()
    .then(document => {
      console.log(document);
      if (document) {
        res.status(200).json(document);
      } else {
        res.status(404).json({
          message: "Not a Valid Entry"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Patch a Task
router.patch("/:taskID", (req, res, next) => {
  const id = req.params.taskID;

  const updateOPS = {};
  for (const ops of req.body) {
    updateOPS[ops.propName] = ops.value;
  }
  Task.update({ _id: id }, { $set: updateOPS })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Task Updated",
        meta: {
          request: "GET",
          url: "http://localhost:3000/tasks",
          description: "Get All Tasks"
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//Delete a Task
router.delete("/:taskID", (req, res, next) => {
  const id = req.params.taskID;
  Task.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Given Id Is Not Available",
        error: err
      });
    });
});

module.exports = router;
