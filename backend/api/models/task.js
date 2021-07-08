const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  taskName: { type: String, required: true },
  dueDate: { type: Date },
  isComplete: { type: Boolean },
  isEveryday: { type: Boolean }
});

module.exports = mongoose.model("Task", taskSchema);
