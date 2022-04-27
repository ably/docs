const { ruleApplications } = require('./rules');

const textile = (content) => {
  return ruleApplications(content);
};

module.exports = {
  textile,
};
