const autoBind = require("auto-bind");
const supabase = require("../../config/supbase.config");

class BookmarkService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = supabase.from("sw_post_saved");
  }
  async checkExistByPostId(id) {
    const data = await this.#model.select({ postId: id });
    return data;
  }
  async save(user, post) {
    const data = await this.#model.insert({
      userId: user,
      postId: post,
    });
    return data;
  }
  async remove(user, post) {
    const data = await this.#model.delete({
      userId: user,
      postId: post,
    });
    return data;
  }
  async checkExist(user, post) {
    const result = await this.#model.select({ userId: user, postId: post });
    if (!result) return undefined;
    return result;
  }
  async myBookmarks(user) {
    return await this.#model
      .select(
        `*, 
        sw_posts (*)`
      )
      .eq("userId", user);
  }
}
module.exports = new BookmarkService();
