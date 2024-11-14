const autoBind = require("auto-bind");
const NodeEnv = require("../../common/constant/env.enum");
const { makeCode } = require("../utils/random");
const { signToken, hashPassword } = require("./auth.utils");
const supabase = require("../../config/supbase.config");

class AuthService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = supabase.from("users");
  }
  async sendOTP(mobile) {
    try {
      const id = makeCode(4);
      const { error } = await this.#model.insert({
        id,
        mobile,
        authMethod: "basic",
      });

      await this.sendCode(mobile);
      return { statusCode: 201, message: "code successfully sended!" };
    } catch (error) {
      return {
        code: error?.code,
        message: error?.message,
      };
    }
  }
  async sendCode(mobile) {
    const user = await this.#model.select({ mobile });
    if (!user) return;
    const now = Date.now();
    if (user?.otpCodeExpires > now)
      return { statusCode: 400, message: "last code not expire" };
    const code = makeCode(6);
    const expiresIn = Date.now() + 60 * 1000 * 2;

    this.#model
      .update({ otpCode: code, otpCodeExpires: expiresIn })
      .eq("mobile", mobile);
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
      const user = await this.#model.select({ mobile });
      if (user && typeof user === "object") {
        if (user?.otpCode === code) {
          if (user?.otpCodeExpires > now) {
            const token = signToken({ mobile, id: user?.id });
            await this.#model
              .update({ verfiedAccount: true, accessToken: token })
              .eq("mobile", mobile);
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
    console.log(user);
    if (user === null) {
      return false;
    }
    return true;
  }
  async signUp(fullname, email, password) {
    const { data } = await supabase.from("users").select("*");

    if (!data) {
      return { statusCode: 500, message: "user exist!" };
    } else {
      const id = makeCode(4);
      const { error } = await supabase.from("users").insert({
        id,
        mobile,
        fullName: fullname,
        email,
        authMethod: "basic",
        password: hashPassword(password),
      });
      return { statusCode: 201, message: "user added" };
    }
  }
  async signIn(email, password, res) {
    const user = await this.#model.findOne({ where: { email } });

    if (user && typeof user === "object") {
      const hashedPassword = hashPassword(password);
      const userPassword = user?.password;

      if (userPassword === hashedPassword) {
        const token = signToken({ email, id: user?.id });
        await this.#model.update(
          { verfiedAccount: true, accessToken: token },
          { where: { email } }
        );
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
