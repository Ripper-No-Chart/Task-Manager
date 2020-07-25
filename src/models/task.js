const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: Boolean, required: true },
  done: { type: Boolean, required: true, default: false },
});

module.exports = mongoose.model("Task", TaskSchema);
