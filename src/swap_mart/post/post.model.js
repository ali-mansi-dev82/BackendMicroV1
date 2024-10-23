const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");
const CategoryModel = require("../category/category.model");
const UserModel = require("../user/user.model");

const PostModel = sequelize.define(
  "sw_post",
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: true },
    slug: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    province: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: false },
    cordinate: { type: DataTypes.JSON, allowNull: false }, //51.1111112 31.658971111
    images: { type: DataTypes.JSON, allowNull: true, default: [] },
    options: { type: DataTypes.JSON, allowNull: true, default: [] },
    status: {
      type: DataTypes.ENUM(["0", "1", "3"]),
      require: false,
      defaultValue: "0",
    }, // { 0 : wating accept admin, 1 : need some changes, 2 : accept by admin, 3 : rejected by admin }
    isDelete: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
  },
  { timestamps: true }
);
PostModel.belongsTo(CategoryModel, {
  as: "category",
  foreignKey: { name: "categoryId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
PostModel.belongsTo(UserModel, {
  as: "user",
  foreignKey: { name: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});

module.exports = PostModel;
