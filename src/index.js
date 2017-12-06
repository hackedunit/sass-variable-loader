import loaderUtils from 'loader-utils';
import getVariables from './get-variables';
import parseVariables from './parse-variables';

function replacer(key, value) {
  if (isNaN(value)) {
    return value;
  }
  return parseFloat(value);
}

module.exports = function sassVariableLoader(content) {
  this.cacheable(); // Flag loader as cacheable
  const opts = Object.assign({}, loaderUtils.getOptions(this));
  const variables = parseVariables(getVariables(content), opts);

  return `module.exports = ${JSON.stringify(variables, replacer)};`;
};
