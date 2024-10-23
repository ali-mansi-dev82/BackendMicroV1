const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const UserModel = require("../user/user.model");
const PostModel = require("../post/post.model");

const OptionModel = sequelize.define(
  "sw_option",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false },
    type: {
      type: DataTypes.ENUM([
        "number",
        "currency",
        "string",
        "array",
        "boolean",
      ]),
    },
    prefix: { type: DataTypes.STRING, required: false, default: "" },
    enum: {
      type: DataTypes.JSON,
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    category: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: true }
);
OptionModel.belongsTo(UserModel, {
  as: "user",
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
OptionModel.belongsTo(PostModel, {
  as: "post",
  foreignKey: { name: "postId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = OptionModel;

// const OptionSchema = new Schema({

// });
// const OptionModel = model("option", OptionSchema);
// module.exports = OptionModel;
