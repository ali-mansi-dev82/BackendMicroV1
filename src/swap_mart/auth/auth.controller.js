const autoBind = require("auto-bind");
const CookieNames = require("../../common/constant/cookieNames.enum");
const AuthService = require("./auth.service");
const authService = require("./auth.service");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOTP(req, res, next) {
    try {
      const { prefix, mobile } = req.body;
      const result = await this.#service.sendOTP(`+${prefix}${mobile}`);
      res.status(result.statusCode ?? 201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const result = await this.#service.checkOTP(mobile, code, res);
      res.status(result.statusCode ?? 201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async signUp(req, res, next) {
    try {
      const { fullname, email, password } = req.body;
      const result = await this.#service.signUp(fullname, email, password);
      res.status(result.statusCode ?? 201).send(result);
    } catch (error) {
      next(error);
    }
  }
  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await this.#service.signIn(email, password, res);
      res.status(result?.statusCode ?? 201).send(result);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new AuthController();
