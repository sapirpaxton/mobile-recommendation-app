getCategories = (req, res) => {
  global.logger.info(global.Categories.categories);
  return res.status(200).json({ success: true, data: global.Categories.categories })
};

module.exports = {
  getCategories
};
