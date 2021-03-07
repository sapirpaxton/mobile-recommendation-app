getApps = (req, res) => {
  global.logger.info(req.query);
  const query = req.query;
  let filterApps = global.Apps.apps;

  if(query.hasOwnProperty('birth_year')) {
    const currentYear = new Date().getFullYear();
    filterApps = filterApps.filter(app => app.min_age <= currentYear - query['birth_year']);
  }
  if(query.hasOwnProperty('category')) {
    filterApps = filterApps.filter(app => app.category === query['category']);
  }
  if(query.hasOwnProperty('rating')) {
    const rate = parseFloat(query['rating']);
    filterApps = filterApps.filter(app => app.rating >= rate);
  }
  if(query.hasOwnProperty('text')) {
    filterApps = filterApps.filter(app => app.description.indexOf(query['text']) > -1);
  }

  global.logger.info(JSON.stringify(filterApps));
  return res.status(200).json({ success: true, data: filterApps })
};

module.exports = {
  getApps
};
