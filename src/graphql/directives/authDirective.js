const { defaultFieldResolver } = require('graphql');
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');

function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];
console.log("authDirective",authDirective)
      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        console.log("fieldConfig",fieldConfig)
        const requiredRole = authDirective.role;
        console.log("requiredRole",requiredRole)

        fieldConfig.resolve = async function (...args) {
          const context = args[2];
          const userRole = context.role;

          

          if (userRole !== requiredRole) {
            throw new Error("You are not authorized to perform this action");
          }

          return resolve.apply(this, args);
        };
      }
      return fieldConfig;
    },
  });
}

module.exports = authDirectiveTransformer;
