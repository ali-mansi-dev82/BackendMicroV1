const autoBind = require("auto-bind");
const NodeEnv = require("../../common/constant/env.enum");
const userModel = require("../user/user.model");
const { makeCode } = require("../utils/random");
const { signToken, hashPassword } = require("./auth.utils");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = userModel;
  }
  async sendOTP(mobile) {
    try {
      const checkExistByMobile = await this.checkExistByMobile(mobile);
      if (checkExistByMobile) {
        return this.sendCode(mobile);
      } else {
        await this.#model.create({
          mobile,
          auth: {
            authType: "otp",
            otp: {
              code: "000000",
              expiresIn: 0,
            },
          },
        });
        return this.sendCode(mobile);
      }
    } catch (error) {
      return {
        code: error?.code,
        message: error?.message,
      };
    }
  }
  async sendCode(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) return;
    const now = Date.now();
    if (user?.otp?.expiresIn > now)
      return { statusCode: 400, message: " last code not expire" };
    const code = makeCode(6);

    const expiresIn = Date.now() + 60 * 1000 * 2;
    user.auth.otp = { code, expiresIn };
    user.save();

    this.sendSMS(code);
    return {
      statusCode: 200,
      message: "code sended successfull",
      expiresIn,
    };
  }
  async sendSMS(code) {
    console.log(`your code is ${code}`);
  }
  async checkOTP(mobile, code, res) {
    try {
      const now = Date.now();
      const user = await this.#model.findOne({ mobile });
      if (user && typeof user === "object") {
        if (user?.auth?.otp?.code === code) {
          if (user?.auth?.otp?.expiresIn > now) {
            const token = signToken({ mobile, id: user?.id });
            user.verfiedAccount = true;
            user.accessToken = token;
            user.save();
            res.cookie("access_token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === NodeEnv,
            });
            return {
              token,
              user: { id: user?._id, mobile: user.mobile },
              statusCode: 200,
              message: "login successful",
            };
          }
          return {
            statusCode: 400,
            message: "time out of code",
          };
        } else {
          return {
            statusCode: 400,
            message: "code is  notCorrect",
          };
        }
      }
      return {
        statusCode: 400,
        message: "mobile not valid",
      };
    } catch (error) {
      return {
        code: error?.code,
        message: error?.message,
      };
    }
  }
  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (user === null) {
      return false;
    }
    return true;
  }
  async checkExistByEmail(email) {
    const user = await this.#model.findOne({ email });
    if (user === null) {
      return false;
    }
    return true;
  }
  async signUp(fullname, email, password) {
    const checkExistByEmail = await this.checkExistByEmail(email);
    if (checkExistByEmail) {
      return { statusCode: 500, message: "user exist!" };
    } else {
      return await this.#model.create(
        {
          fullName: fullname,
          email,
          authMethod: "basic",
          password: hashPassword(password),
        },
        { fields: ["fullName", "email", "authMethod", "password"] }
      );
    }
  }
  async signIn(email, password, res) {
    const user = await this.#model.findOne({ email });

    if (user && typeof user === "object") {
      const hashedPassword = hashPassword(password);
      const userPassword = user?.auth?.basic?.password;

      if (userPassword === hashedPassword) {
        const token = signToken({ email, id: user?.id });
        user.verfiedAccount = true;
        user.accessToken = token;
        user.save();
        res.cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv,
        });
        return {
          token,
          user: { id: user?._id, email: user.email },
          statusCode: 200,
          message: "login successful",
        };
      }
      return { statusCode: 100, message: "wrong password!" };
    }
    return { statusCode: 404, message: "user not exist!" };
  }
}
module.exports = new AuthService();
