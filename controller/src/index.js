const _ = require("lodash");
const BaseController = require("../BaseController");
const express = require("express");
const router = express.Router();
const utils = require("../../helpers/utils");
const config = require("../../config/index");
const { loginSchema, registerSchema } = require("../../validations/validation");
const userService = require("../../services/core/UserService");
const { pUserLogin } = require("../../helpers/projections");
const { ValidationError } = require("../../helpers/errors/index");

router.get("/", async (req, res, next) => {
  return res.send(config.app);
});

router.post("/login", async (req, res, next) => {
  try {
    const data = req.body;
    await req.validate(loginSchema, data);
    const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegexp.test(data.emailOrPhone)) {
      data.emailOrPhone = await utils.parsePhoneNumber(data.emailOrPhone, true);
    }
    const response = await userService.login(data);
    res.send(pUserLogin.pickFrom(response));
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const data = req.body;
    await req.validate(registerSchema, data);
    data.phone = await utils.parsePhoneNumber(data.phone);
    if (data.password !== data.confirmPassword) {
      throw new ValidationError(
        0,
        `The password confirmation does not match.`,
        "تأكيد كلمة المرور غير متطابق."
      );
    }
    const user = await userService.create(data);
    const response = user;
    if (utils.inDevelopment()) {
      response.code = user.verifyPhone.token;
    }
    res.send(pUserLogin.pickFrom(response));
  } catch (err) {
    next(err);
  }
});

module.exports = new BaseController("/", "public", router);
