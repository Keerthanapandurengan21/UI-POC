const { gql } = require('apollo-server-express');

const taskSchema = gql`
  directive @auth(role: String) on FIELD_DEFINITION

  enum Role {
    ADMIN
    USER
  }

  type Task {
    taskId: String!
    title: String
    description: String
    status: String
    priority: String @deprecated(reason: "priority attribute is no longer in used")
    dueDate: String
  }

  type Query {
    getTasks: [Task]
    getTask(taskId: String!): Task
  }

  type Mutation {
    createTask(taskId: String!, title: String, description: String, status: String, priority: String, dueDate: String): Task @auth(role: "ADMIN")
    updateTask(taskId: String!, title: String, description: String, status: String, priority: String, dueDate: String): Task @auth(role: "ADMIN")
    deleteTask(taskId: String!): Boolean @auth(role: "ADMIN")
  }
`;

module.exports = taskSchema;
