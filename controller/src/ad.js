const _ = require("lodash");
const path = require("path");
const RESOURCE_NAMES = require("../../config/auth/resource_names");
const errors = require("../../helpers/errors");
const express = require("express");
const router = express.Router();
const utils = require("../../helpers/utils");
const adService = require("../../services/core/AdService");
const { adSchema, idSchema } = require("../../validations/validation");
const BaseController = require("../BaseController");

const multer = require("multer");
const { multipartParser } = require("../middlewares/index");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post(
  "/",
  upload.single("image"),
  multipartParser,
  async (req, res, next) => {
    try {
      await req.authorize(req.user, RESOURCE_NAMES.ADS, ["createAny"]);
      const data = req.body;
      req.validate(adSchema, data);
      const response = await adService.create(data, req.file);
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.ADS, ["readAny"]);
    const filters = req.query;
    const params = req.query;
    const response = await adService.getAds("", filters, params);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get("/own", async (req, res, next) => {
  try {
    await req.authorize(req.user, RESOURCE_NAMES.ADS, ["readAny"]);
    const filters = req.query;
    const params = req.query;
    const response = await adService.getAds(req.user._id, filters, params);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.ADS, ["readAny"]);
    const response = await adService.getone(req.params.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  upload.single("image"),
  multipartParser,
  async (req, res, next) => {
    try {
      await req.validate(idSchema, { id: req.params.id });
      await req.authorize(req.user, RESOURCE_NAMES.ADS, ["updateAny"]);
      const data = req.body;
      await req.validate(adSchema, data, false);
      const response = await adService.updateOne(data, req.params.id, req.file);
      res.send(response);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", async (req, res, next) => {
  try {
    await req.validate(idSchema, { id: req.params.id });
    await req.authorize(req.user, RESOURCE_NAMES.ADS, ["deleteAny"]);
    const response = await adService.delete(req.params.id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = new BaseController("/ads", "private", router);

//Done Documentation
