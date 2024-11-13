const { DataTypes } = require("@sequelize/core");
const sequelize = require("../../config/sequelize.config");

const UserModel = sequelize.define(
  "sw_user",
  {
    fullName: { type: DataTypes.STRING, allowNull: true },
    mobile: { type: DataTypes.STRING, allowNull: true },
    email: { type: DataTypes.STRING, validate: { max: 35 }, allowNull: true },
    authMethod: {
      type: DataTypes.ENUM(["otp", "basic", "oauth"]),
      defaultValue: "basic",
    },
    password: { type: DataTypes.STRING, allowNull: true },
    otpCode: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    otpCodeExpires: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: 0,
    },
    verfiedAccount: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    accessToken: { type: DataTypes.STRING, defaultValue: "", allowNull: true },
    role: {
      type: DataTypes.ENUM(["admin", "teacher", "user"]),
      defaultValue: "user",
      allowNull: false,
    },
  }
  // { timestamps: true }
);

module.exports = UserModel;
