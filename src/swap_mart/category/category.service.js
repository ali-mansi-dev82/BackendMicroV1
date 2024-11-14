const { isValidObjectId, Types } = require("mongoose");
const { HttpError } = require("http-error");
const { isEmpty } = require("../utils/functions");
const autoBind = require("auto-bind");
const supabase = require("../../config/supbase.config");

class CategoryService {
  #model;
  #optionmodel;
  constructor() {
    autoBind(this);
    this.#model = supabase.from("sw_categories");
    this.#optionmodel = supabase.from("sw_options");
  }
  async create(categoryDto) {
    if (categoryDto?.parent && isValidObjectId(categoryDto?.parent)) {
      const existCategory = await this.checkExistById(categoryDto?.parent);
      if (existCategory) {
        categoryDto.parents = [
          ...new Set(
            [existCategory._id.toString()]
              .concat(existCategory.parents.map((id) => id.toString()))
              .map((id) => new Types.ObjectId(id))
          ),
        ];
      }
    }
    const category = await this.#model.insert({ ...categoryDto });
    return category;
  }
  async find() {
    return await this.#model.select("*").eq("parent", null);
  }
  async checkExistById(id) {
    const category = this.#model.select("*").eq("id", id);
    if (!category) throw new HttpError("Category not found");
    return category;
  }
  async checkExistBySlug(slug) {
    const category = this.#model.select("*").eq("slug", slug);
    if (!category) throw new HttpError("Category not found");
    return category;
  }
  async alreadyExistBySlug(slug) {
    const category = this.#model.select("*").eq("slug", slug);
    if (category) throw new HttpError("conflict");
    return category;
  }
  async update(id, optionDto) {
    await this.checkExistById(id);
    if (isEmpty(optionDto.name)) delete optionDto.name;
    if (isEmpty(optionDto.slug)) delete optionDto.slug;
    if (isEmpty(optionDto.icon)) delete optionDto.icon;
    if (isEmpty(optionDto.parent) || isValidObjectId(optionDto.parent))
      delete optionDto.parent;
    if (isEmpty(optionDto.parents)) delete optionDto.parents;

    this.#model.update(optionDto).eq("id", id);
  }
  async delete(id) {
    const existCategory = await this.checkExistById(id);
    const data = await this.#model.select("*").eq("parents", id);
    data.push(existCategory);
    await data.map(async (item) => {
      await this.checkExistById(item._id);
      await this.#optionmodel.deleteMany({ category: item._id }).then(() => {
        this.#model.delete().eq("id", item._id);
      });
    });

    return {
      statusCode: 201,
      message: "categories and options deleted successfully",
    };
  }

  async getBySlug(slug) {
    // if (isEmpty(slug) || slug === "root") {
    //   return await this.#model.aggregate([
    //     {
    //       $match: {
    //         parent: null,
    //       },
    //     },
    //   ]);
    // }
    // return await this.#model.aggregate([
    //   {
    //     $match: {
    //       slug: slug,
    //     },
    //   },
    // ]);
  }
  async getChildrenBySlug(slug) {
    // if (isEmpty(slug)) return { message: "slug is empty" };
    // const targetId = (await this.#model.findOne({ slug }))._id;
    // const categories = await this.#model.find({
    //   parents: { $in: [targetId] },
    // });
    // return [...categories, { _id: targetId }];
  }
  async getByParentSlug(slug) {
    // if (isEmpty(slug) || slug === "root") {
    //   return this.#model
    //     .find({ parent: null }, { parents: 0 })
    //     .populate(["children"]);
    // }

    // const categoryTree = await this.#model
    //   .find({ slug }, { parents: 0 })
    //   .populate(["children", "parent"]);

    // if (categoryTree.length <= 0)
    //   return { statusCode: 404, message: "no message" };
    // if (categoryTree[0]?.parent !== null) {
    //   categoryTree[0].parent = await this.#model.findOne({
    //     _id: categoryTree[0]?.parent,
    //   });
    // }
    // return categoryTree[0];
  }
  async search(query) {
    // if (!query || isEmpty(query) || query === "no") {
    //   const result = await this.find();
    //   return result;
    // }
    // const categoryTree = await this.#model
    //   .find({ name: { $regex: new RegExp(query, "i") } }, { parents: 0 })
    //   .populate(["children", "parent"]);

    // return categoryTree;
  }
  async allParents(slug) {
    // const parents = [];
    // let category = await this.#model.findOne({ slug });
    // parents.push(category);
    // while (category?.parent) {
    //   category = await this.#model.findOne({ _id: category.parent });
    //   parents.push(category);
    // }
    // return parents;
  }
}
module.exports = new CategoryService();
