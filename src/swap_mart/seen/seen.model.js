const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const UserModel = require("../user/user.model");
const PostModel = require("../post/post.model");

const SeenModel = sequelize.define(
  "sw_seen",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    postId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: true }
);
SeenModel.belongsTo(UserModel, {
  as: "user",
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
SeenModel.belongsTo(PostModel, {
  as: "post",
  foreignKey: { name: "postId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = SeenModel;
