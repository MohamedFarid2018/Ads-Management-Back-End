const _ = require("lodash");
const BaseService = require("../BaseService");
const { User } = require("../../db/models/index");
const bcrypt = require("bcrypt");
const utils = require("../../helpers/utils");

class UserService extends BaseService {
  async login(data) {
    const user = await User.getOne({
      $or: [{ phone: data.emailOrPhone }, { email: data.emailOrPhone }],
      isArchived: false,
    });
    if (!user) {
      throw new this.UnauthenticatedError(
        0,
        `this user does not exist`,
        "هذا المستخدم غير موجود"
      );
    } else {
      const match = await bcrypt.compare(data.password, user.password);
      if (!match) {
        throw new this.ValidationError(
          0,
          `password is not correct...please try again`,
          "كلمة المرور غير صحيحة ... يرجى المحاولة مرة أخرى"
        );
      }
      if (
        data.from &&
        data.from === "dashboard" &&
        user.roles.includes("user")
      ) {
        throw new this.UnauthenticatedError(
          0,
          `this admin does not exist`,
          "هذا الادمن غير موجود"
        );
      }
    }
    return user;
  }

  async create(data) {
    const checkPhone = await User.getOne({
      phone: data.phone,
      isArchived: false,
    });
    if (checkPhone) {
      throw new this.DuplicationError(
        0,
        `user with this phone number already exists`,
        "رقم الهاتف هذا موجود بالفعل"
      );
    }
    const checkEmail = await User.getOne({
      email: data.email,
      isArchived: false,
    });
    if (checkEmail) {
      throw new this.DuplicationError(
        0,
        `user with this email already exists`,
        "البريد الإلكتروني هذا موجود بالفعل"
      );
    }
    if (data.type) data.roles = [data.type];
    const user = await User.create(data);
    return user;
  }

  async getUsers(filters, params = {}, pagination = true) {
    const nParams = params;
    const query = { isArchived: false, $or: [], $and: [] };

    if (nParams.name) {
      query.$or.push({ name: { $regex: filters.name, $options: "i" } });
    }
    if (nParams.phone) {
      let phone = nParams.phone;
      if (String(nParams.phone).startsWith("+2"))
        phone = phone.replace("+2", "");
      query.$or.push({ phone: { $regex: phone } });
    }
    if (nParams.email) {
      query.$or.push({ email: { $regex: filters.email } });
    }
    if (filters.role) {
      query["roles.0"] = { $in: filters.role };
    }
    nParams.lean = true;
    let paginate = pagination;
    if (nParams.pagination) {
      paginate = this.utils.parseBoolean(nParams.pagination);
    }
    nParams.sort = { created_at: -1 };
    if (query.$or.length === 0) delete query.$or;
    if (query.$and.length === 0) delete query.$and;
    return await User.getAll(query, nParams, paginate);
  }

  async getUser(id, lean = true, conversation = "") {
    const options = {};
    if (lean) {
      options["lean"] = lean;
    }
    const params = {};
    const user = await User.getOne(
      { _id: id, isArchived: false },
      params,
      options
    );
    if (!user) {
      throw new this.NotFoundError(
        0,
        `user with id ${id} not found`,
        `هذا المستخدم بال id ${id} غير موجود`
      );
    }
    return user;
  }

  async updateUser(id, data) {
    try {
      const user = await this.getUser(id);
      const options = {};
      if (data.phone) {
        const checkPhone = await User.getOne({
          phone: data.phone,
          isArchived: false,
          _id: { $ne: id },
        });

        if (checkPhone) {
          throw new this.DuplicationError(
            0,
            `user with this phone number already exists`,
            "رقم الهاتف هذا موجود بالفعل"
          );
        }
      }
      if (data.email) {
        const checkEmail = await User.getOne({
          email: data.email,
          isArchived: false,
          _id: { $ne: id },
        });
        if (checkEmail) {
          throw new this.DuplicationError(
            0,
            `user with this email already exists`,
            "البريد الإلكتروني هذا موجود بالفعل"
          );
        }
      }

      const params = {};
      options["new"] = true;
      const result = await User.updateById(id, data, options, params);
      return result;
    } catch (err) {
      throw err;
    }
  }

  async logout(id) {
    try {
      const user = await this.getUser(id);
      const options = {};
      const params = {};
      options["new"] = true;
      const update = {
        fcmToken: "",
      };
      await User.updateById(id, update, options);
      return { success: true, message: "logged out successfully" };
    } catch (err) {
      throw err;
    }
  }

  async deleteUser(id) {
    try {
      const user = await this.getUser(id);
      await User.updateById(id, { isArchived: true });
      return { message: "user has been deleted" };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = new UserService();
