const BookmarkModel = require("./bookmark/bookmark.model");
const CategoryModel = require("./category/category.model");
const ImageModel = require("./image/image.model");
const NoteModel = require("./note/note.model");
const OptionModel = require("./option/option.model");
const PostModel = require("./post/post.model");
const SeenModel = require("./seen/seen.model");
const UserModel = require("./user/user.model");

const SyncsModels = async () => {
  await UserModel.sync({ alter: true });
  await CategoryModel.sync({ alter: true });
  await ImageModel.sync({ alter: true });
  await PostModel.sync({ alter: true });
  await SeenModel.sync({ alter: true });
  await BookmarkModel.sync({ alter: true });
  await NoteModel.sync({ alter: true });
  await OptionModel.sync({ alter: true });
};
module.exports = SyncsModels;
