const { Router } = require("express");
const authController = require("./auth.controller");
const router = Router();

router.post("/send-otp", authController.sendOTP);
router.post("/check-otp", authController.checkOTP);
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);

module.exports = {
  AuthRouters: router,
};
