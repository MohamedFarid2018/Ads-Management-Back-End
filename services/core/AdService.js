const _ = require("lodash");
const BaseService = require("../BaseService");
const { Ad, User } = require("../../db/models/index");
const config = require("../../config/config.prod");
const utils = require("../../helpers/utils");
const utilsCircular = require("../../helpers/utils-circular");
const ImageResizeing = require("../../utils/image-processing-utils");
const uploadResizedImage = require("../../shared/Cloudinary");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.appSecret,
});

class AdService extends BaseService {
  async create(data, file) {
    if (file && file.path) {
      const image = await cloudinary.uploader.upload(file.path);
      data.image = image.secure_url;
    }
    const ad = await Ad.create(data);
    return ad;
  }

  async getAds(userId = "", filters, params = {}, pagination = false) {
    const nParams = params;
    const query = { isArchived: false, $or: [] };
    if (nParams.title) {
      query["$or"].push({ title: { $regex: new RegExp(filters.title, "i") } });
    }
    if (nParams.category) {
      query["category"] = filters.category;
    }

    if (nParams.advertiser || userId) {
      query["advertiser"] = filters.advertiser ? filters.advertiser : userId;
    }

    if (nParams.tags) {
      const tags = nParams.tags.split(",");
      query["tags"] = { $in: tags };
    }

    nParams.populate = [["category"], ["tags"], ["advertiser"]]

    if (!query.$or.length) delete query.$or;
    nParams.lean = true;
    let paginate = pagination;
    if (nParams.pagination) {
      paginate = this.utils.parseBoolean(nParams.pagination);
    }
    nParams.sort = { created_at: -1 };
    const ads = await Ad.getAll(query, nParams, paginate);
    return ads;
  }

  async getone(id) {
    const ad = await Ad.getOne({ _id: id, isArchived: false }, { lean: true });
    if (!ad) {
      throw new this.NotFoundError(
        0,
        `there is no ad with this id ${id}`,
        `عفوا هذا الاعلان غير موجود`
      );
    }
    return ad;
  }

  async updateOne(data, id, file) {
    try {
      const ad = await this.getone(id);
      if (file && file.path) {
        const image = await cloudinary.uploader.upload(file.path);
        data.image = image.secure_url;
      }
      const result = await Ad.updateById(id, data, { new: true });
      return result;
    } catch (err) {
      throw err;
    }
  }

  async delete(id) {
    const ad = await this.getone(id);
    const update = { isArchived: true };
    await Ad.updateById(id, update);
    return {
      success: true,
      message: `Ad ${ad.name} has been deleted`,
    };
  }
}

module.exports = new AdService();
