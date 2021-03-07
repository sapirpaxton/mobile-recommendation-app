const express = require('express');
const axios = require('axios');

const config = require('./config');
const appsRouter = require('./routes/recommendation-router');
let Apps = require('./models/apps');
let Categories = require('./models/categories');

const app = express();
global.Apps = new Apps();
global.Categories = new Categories();
global.logger = require('./config/logger');

app.use('/api', appsRouter);
app.on('error', (err) => {
  global.logger.error(err);
});

async function initializeServer() {
  try {
    const appsResponse = await axios.get(config.appsURL);
    global.Apps.setApps(appsResponse.data);
    const categoriesResponse = await axios.get(config.categoriesURL);
    global.Categories.setCategories(categoriesResponse.data);
  } catch (e) {
   throw new Error(e);
  }
}

initializeServer()
    .then(() => {
      app.listen(config.port, () => global.logger.info(`Server running on port ${config.port}`));
    })
    .catch((e) => {
      global.logger.error(e, 'Failed fetching Apps data');
    });
