const Task = require('../../models/task');

const resolvers = {
  Query: {
    getTasks: async () => await Task.find(),
    getTask: async (_, { taskId }) => {
      const task = await Task.findOne({ taskId });
      if (!task) throw new Error('Task not found');
      return task;
    },
  },
  Mutation: {
    createTask: async (_, { taskId, title, description, status, priority, dueDate }) => {
      const task = new Task({ taskId, title, description, status, priority, dueDate });
      return await task.save();
    },
    updateTask: async (_, { taskId, title, description, status, priority, dueDate }) => {
      const updatedTask = await Task.findOneAndUpdate(
        { taskId },
        { title, description, status, priority, dueDate },
        { new: true }
      );
      if (!updatedTask) throw new Error('Task not found');
      return updatedTask;
    },
    deleteTask: async (_, { taskId }) => {
      const deletedTask = await Task.findOneAndDelete({ taskId });
      if (!deletedTask) throw new Error('Task not found');
      return true;
    },
  },
};

module.exports = resolvers;
