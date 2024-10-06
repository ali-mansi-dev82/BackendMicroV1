const { Router } = require("express");
const { SwapMartRouters } = require("./swap_mart/app.routes");

const router = Router();

router.use("/swap-mart", SwapMartRouters);

module.exports = {
  MainRouters: router,
};
