const ImageService = require("../../swap_mart/image/image.service");

const deleteExpiredImage = async (req, res, next) => {
  await ImageService.deleteExpiredImage();
  return next();
};
module.exports = deleteExpiredImage;
