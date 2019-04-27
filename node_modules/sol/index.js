module.exports = process && process.env && process.env.SOL_COV
  ? require('./lib-cov/sol')
  : require('./lib/sol');
