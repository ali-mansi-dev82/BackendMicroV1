const path = require("path");
const fs = require("fs");
const autoBind = require("auto-bind");
const supabase = require("../../config/supbase.config");

class ImageService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = supabase.from("pub_images");
  }
  async create(name, expire = null) {
    const expiresIn =
      expire === "infinity"
        ? "infinity"
        : Date.now() + 60 * 60000; /* half hours ago */

    return this.#model.insert({
      name,
      expire: expiresIn,
    });
  }
  async infinityUpdate(name) {
    const image = await this.#model.update({ expire: -1 }).eq("name", name);
    return image;
  }
  async find() {
    const image = await this.#model.select("*");
    return image;
  }
  async findNotInfinite() {
    const image = await this.#model.select("*").neq("expire", -1);
    return image;
  }
  async deleteExpiredImage() {
    // const now = Date.now();
    // const image = await this.#model.find({ expire: { $ne: -1 } });
    // image.map((value, index) => {
    //   if (value.expire < now) {
    //     this.deleteById(value._id, true);
    //   }
    // });
    // return true;
  }
  async deleteById(id, access = false) {
  //   const image = await this.#model.findOne({ _id: id });
  //   if (image.expire === -1 && !access)
  //     return { statusCode: 401, message: "you cant delete files" };
  //   try {
  //     fs.unlinkSync(
  //       path.join(__dirname, "../../../public/images/", image.name)
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   const deleteImage = await this.#model.deleteOne({ _id: id });
  //   return deleteImage.deletedCount > 0 ? true : false;
  }
}
module.exports = new ImageService();
