const _ = require("lodash");
const BaseService = require("../BaseService");
const { Category } = require("../../db/models/index");

class CategoryService extends BaseService {
  async getCategories(filters, params = {}, pagination = false) {
    const nParams = params;
    const query = { isArchived: false };
    if (nParams.name) {
      query["name"] = { $regex: new RegExp(filters.name, "i") };
    }
    nParams.lean = true;
    let paginate = pagination;
    if (nParams.pagination) {
      paginate = this.utils.parseBoolean(nParams.pagination);
    }
    nParams.sort = { created_at: -1 };
    return await Category.getAll(query, nParams, paginate);
  }

  async create(data) {
    try {
      const newCategory = await Category.create(data);
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  async updateCategory(data, id) {
    try {
      await this.getOne(id);
      const newCategory = await Category.updateById(id, data, { new: true });
      return newCategory;
    } catch (err) {
      throw err;
    }
  }

  async deleteCategory(id) {
    const categories = await Category.updateById(id, { isArchived: true });
    if (categories) {
      return {
        message: `category with Name '${categories.name}' has been deleted`,
      };
    } else {
      throw new this.NotFoundError(
        0,
        `category with id ${id} not found`,
        "هذا التصنيف غير موجود"
      );
    }
  }

  async getOne(id) {
    const categories = await Category.getOne({ _id: id, isArchived: false });
    if (!categories) {
      throw new this.ValidationError(
        0,
        `Category Does Not exist`,
        "هذا التصنيف غير موجود"
      );
    }
    return categories;
  }
}

module.exports = new CategoryService();
