const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const UserModel = require("../user/user.model");
const PostModel = require("../post/post.model");

const NoteModel = sequelize.define(
  "sw_note",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
NoteModel.belongsTo(UserModel, {
  as: "user",
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
NoteModel.belongsTo(PostModel, {
  as: "post",
  foreignKey: { name: "postId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = NoteModel;

