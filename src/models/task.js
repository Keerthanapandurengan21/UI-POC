
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  status: String,
  priority: String,
  dueDate: Date,
});

module.exports = mongoose.model('Task', TaskSchema);
