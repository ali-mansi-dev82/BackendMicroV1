const { default: mongoose } = require("mongoose");

const OTPSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    default: undefined,
    maxlength: 6,
    minlength: 6,
  },
  expiresIn: { type: Number, required: false, default: 0 },
});

const BasicAuthSchema = new mongoose.Schema({
  password: { type: String, required: true, unique: false },
});

const AuthSchema = new mongoose.Schema({
  authType: { type: String, enum: ["otp", "basic", "oauth"] },
  otp: { type: OTPSchema },
  basic: { type: BasicAuthSchema },
});

const UserSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: false },
    mobile: { type: String, required: false },
    email: { type: String, required: false },
    auth: { type: AuthSchema },
    verfiedAccount: { type: Boolean, default: false, required: true },
    accessToken: { type: [String], default: "" },
    role: {
      type: String,
      enum: ["admin", "teacher", "user"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("verification_user", UserSchema);

module.exports = userModel;
