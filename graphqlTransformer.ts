// eslint-disable-next-line @typescript-eslint/no-require-imports
const gql = require('graphql-tag');

module.exports = {
  process(src) {
    const transformedCode = `module.exports = ${JSON.stringify(gql(src))};`;
    return { code: transformedCode };
  },
};
