const _ = require("lodash");
const BaseController = require("../BaseController");
const express = require("express");
const router = express.Router({ mergeParams: true });
const { tagSchema, idSchema } = require("../../validations/validation");
const tagService = require("../../services/core/TagService");
const RESOURCE_NAMES = require("../../config/auth/resource_names");

router.post("/", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.TAG, ["createAny"]);
    const data = req.body;
    await req.validate(tagSchema, data);
    const result = await tagService.create(data);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.TAG, ["readAny"]);
    const filters = req.query;
    const params = req.query;
    const result = await tagService.getTags(filters, params);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.TAG, ["readAny"]);
    const result = await tagService.getOne(req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.TAG, ["updateAny"]);
    const data = req.body;
    await req.validate(tagSchema, data, false);
    const result = await tagService.updateTag(data, req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.TAG, ["deleteAny"]);
    const result = await tagService.deleteTag(req.params.id);
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = new BaseController("/tags", "private", router);
