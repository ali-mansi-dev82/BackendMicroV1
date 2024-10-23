const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const CategoryModel = sequelize.define(
  "sw_category",
  {
    name: { type: DataTypes.STRING, index: true },
    slug: { type: DataTypes.STRING, index: true, unique: true, index: true },
    icon: { type: DataTypes.STRING },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    // parents: {
    //   type: [Types.ObjectId],
    //   ref: "category",
    //   required: false,
    //   default: [],
    // },
  },
  { timestamps: true }
);
CategoryModel.belongsTo(CategoryModel, {
  as: "parent",
  foreignKey: { name: "parentId", onDelete: "CASCADE", onUpdate: "CASCADE" },
});
module.exports = CategoryModel;
