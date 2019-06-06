const path = require('path');
module.exports = (app) => {
  const models = require(path.resolve(__dirname, '../model-config.json'));
  const datasources = require(path.resolve(__dirname, '../datasources.json'));
  var mysqlDS = app.dataSources.mysqlDb;

  Object.keys(models).forEach(modelName => {
    if (models[modelName].dataSource === 'mysqlDb') {
      mysqlDS.autoupdate(modelName, (err) => {
        if (err)
          throw new Error(`Cannot migrate model ${modelName}: ${err.message}`);
        console.log('Model ' + modelName + ' updated');
      });
    }
  });
};