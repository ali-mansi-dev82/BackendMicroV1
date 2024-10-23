const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const ImageModel = sequelize.define(
  "sw_image",
  {
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    expire: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: -1 /* infinity */,
    },
  },
  { timestamps: true }
);
module.exports = ImageModel;
