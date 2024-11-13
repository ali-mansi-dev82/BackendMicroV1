const { Router } = require("express");
const { AuthRouters } = require("./auth/auth.routes");
const { UserRouters } = require("./user/user.routes");
const { CategoryRouters } = require("./category/category.routes");
const { OptionRouter } = require("./option/option.routes");
const { PostRouters } = require("./post/post.routes");
const { ImageRouter } = require("./image/image.routes");
const { StateRouter } = require("./state/state.routes");
const { CityRouter } = require("./city/city.routes");
const { BookmarkRouter } = require("./bookmark/bookmark.routes");
const { NoteRouter } = require("./note/note.routes");
const { SpecialRouter } = require("./specials/specials.routes");

const router = Router();

router.use("/auth", AuthRouters);
router.use("/user", UserRouters);
// router.use("/post", PostRouters);
// router.use("/category", CategoryRouters);
// router.use("/option", OptionRouter);
// router.use("/image", ImageRouter);
// router.use("/state", StateRouter);
// router.use("/city", CityRouter);
// router.use("/bookmark", BookmarkRouter);
// router.use("/note", NoteRouter);
// router.use("/special", SpecialRouter);

module.exports = {
  SwapMartRouters: router,
};
