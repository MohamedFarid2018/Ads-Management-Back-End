const _ = require("lodash");
const RESOURCE_NAMES = require("../../config/auth/resource_names");
const express = require("express");
const router = express.Router({ mergeParams: true });
const utils = require("../../helpers/utils");
const userService = require("../../services/core/UserService");
const {
  createUserSchema,
  idSchema,
  updateProfileSchema,
} = require("../../validations/validation");
const { pUserLogin, pUserBasicData } = require("../../helpers/projections");
const BaseController = require("../BaseController");

router.get("/", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.USER, ["readAny"]);
    const filters = req.query;
    const params = req.query;
    if (req.query.role) {
      filters.role = req.query.role.split(",");
    }
    const response = await userService.getUsers(filters, params);
    response.users = pUserBasicData.pickFromArray(response.users);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.USER, ["readAny", "readOwn"]);
    const conversation = req.query.conversation || "";
    const response = await userService.getUser(
      req.params.id,
      true,
      conversation
    );
    res.send(pUserBasicData.pickFrom(response));
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.USER, [
      "updateAny",
      "updateOwn",
    ]);
    const data = req.body;
    const id = req.params.id;
    await req.validate(updateProfileSchema, data, false);
    if (data.password) delete data.password;
    if (data.phone) data.phone = await utils.parsePhoneNumber(data.phone);
    const response = await userService.updateUser(id, data);
    res.send(pUserBasicData.pickFrom(response));
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.USER, ["createAny"]);
    const data = req.body;
    await req.validate(createUserSchema, data);
    data.phone = await utils.parsePhoneNumber(data.phone);
    const response = await userService.create(data);
    res.send({ id: response._id });
  } catch (err) {
    next(err);
  }
});

router.post("/logout", async (req, res, next) => {
  try {
    const response = await userService.logout(req.user._id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.USER, [
      "deleteAny",
      "deleteOwn",
    ]);
    const response = await userService.deleteUser(req.params.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = new BaseController("/users", "private", router);
//Done Documentation
