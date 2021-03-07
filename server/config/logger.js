const bunyan = require('bunyan');
const fs = require('fs');

const logsFolder = 'logs';

const config = {
  name: 'RECOMMENDATION-APP',
  serializers: bunyan.stdSerializers,
  streams: [{
    level: 'info',
    path: `${logsFolder}/app.log`,
  },
  ],
};
function ensureLogFolderExistence() {
  try {
    fs.mkdirSync(logsFolder);
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
}
ensureLogFolderExistence();
module.exports = bunyan.createLogger(config);
