const { makeExecutableSchema } = require('@graphql-tools/schema');
const taskSchema = require('./taskSchema');
const taskResolver = require('../resolvers/taskResolvers');
const authDirectiveTransformer = require('../directives/AuthDirective');

let schema = makeExecutableSchema({
  typeDefs: [taskSchema],
  resolvers: [taskResolver],
});

schema = authDirectiveTransformer(schema, 'auth');

module.exports = schema;
