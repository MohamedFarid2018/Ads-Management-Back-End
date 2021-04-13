const _ = require("lodash");
const BaseService = require("../BaseService");
const { Tag } = require("../../db/models/index");

class TagService extends BaseService {
  async getTags(filters, params = {}, pagination = false) {
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
    return await Tag.getAll(query, nParams, paginate);
  }

  async create(data) {
    try {
      const newTag = await Tag.create(data);
      return newTag;
    } catch (err) {
      throw err;
    }
  }

  async updateTag(data, id) {
    try {
      await this.getOne(id);
      const newTag = await Tag.updateById(id, data, { new: true });
      return newTag;
    } catch (err) {
      throw err;
    }
  }

  async deleteTag(id) {
    const tags = await Tag.updateById(id, { isArchived: true });
    if (tags) {
      return {
        message: `tag with Name '${tags.name}' has been deleted`,
      };
    } else {
      throw new this.NotFoundError(
        0,
        `tag with id ${id} not found`,
        "هذا الشعار غير موجود"
      );
    }
  }

  async getOne(id) {
    const tags = await Tag.getOne({ _id: id, isArchived: false });
    if (!tags) {
      throw new this.ValidationError(
        0,
        `Tag Does Not exist`,
        "هذا الشعار غير موجود"
      );
    }
    return tags;
  }
}

module.exports = new TagService();
