const { ROLES_NAMES, ROLE_NAMES_ENUM } = require("../config/auth/roles");
const { LANGUAGES_ENUM } = require("../config/constants/languages");
const { APPLY_STATUS_ENUM } = require("../config/constants/apply");
const { DAYS_NAMES_ENUM } = require("../config/constants/days");
const {
  REQUEST_STATUS,
  COMPLAINTORSUGGESTION,
} = require("../config/constants/common");

module.exports = {
  idSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        pattern: "^[0-9a-fA-F]{24}$",
      },
    },
    required: ["id"],
  },

  loginSchema: {
    type: "object",
    properties: {
      emailOrPhone: { type: "string" },
      password: { type: "string" },
      type: {
        type: "string",
        enum: ROLE_NAMES_ENUM,
      },
    },
    required: ["emailOrPhone", "password"],
  },
  createUserSchema: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      phone: {
        type: "string",
        minLength: 11,
        maxLength: 13,
        // pattern: '^(\\+|00)\\d+',
      },
      password: { type: "string" },
      type: {
        type: "string",
        enum: ROLE_NAMES_ENUM,
      },
    },
    required: ["email", "phone", "password", "type"],
  },
  registerSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string", format: "email" },
      phone: {
        type: "string",
        minLength: 11,
        maxLength: 13,
        // pattern: '^(\\+|00)\\d+',
      },
      type: {
        type: "string",
        enum: ROLE_NAMES_ENUM,
      },
      password: { type: "string" },
      confirmPassword: { type: "string" },
    },
    required: ["name", "email", "phone", "password", "confirmPassword"],
  },
  updateProfileSchema: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 3 },
      profileImage: { type: "string" },
      fcmToken: { type: "string" },
      gender: { type: "string", enum: ["male", "female"] },
      email: { type: "string", format: "email" },
      phone: {
        type: "string",
        minLength: 11,
        maxLength: 13,
      },
    },
    additionalProperties: false,
  },

  categorySchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      translation: {
        type: "object",
        propertyNames: { enum: LANGUAGES_ENUM },
        patternProperties: {
          "^[a-z]{2}$": {
            type: "object",
            properties: {
              name: { type: "string", minLength: 1 },
            },
            required: ["name"],
          },
        },
        minProperties: 1,
      },
    },
    required: ["name"],
  },

  tagSchema: {
    type: "object",
    properties: {
      name: { type: "string" },
      translation: {
        type: "object",
        propertyNames: { enum: LANGUAGES_ENUM },
        patternProperties: {
          "^[a-z]{2}$": {
            type: "object",
            properties: {
              name: { type: "string", minLength: 1 },
            },
            required: ["name"],
          },
        },
        minProperties: 1,
      },
    },
    required: ["name"],
  },

  adSchema: {
    type: "object",
    properties: {
      type: { type: "string", enum: ["free", "paid"] },
      title: { type: "string" },
      description: { type: "string" },
      image: { type: "string" },
      startDate: { type: "string", format: "date" },
      endDate: { type: "string", format: "date" },
      category: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
      advertiser: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
      tags: {
        type: "array",
        items: { type: "string", pattern: "^[0-9a-fA-F]{24}$" },
      },
      translation: {
        type: "object",
        propertyNames: { enum: LANGUAGES_ENUM },
        patternProperties: {
          "^[a-z]{2}$": {
            type: "object",
            properties: {
              name: { type: "string", minLength: 1 },
            },
            required: ["name"],
          },
        },
        minProperties: 1,
      },
    },
    required: [
      "type",
      "title",
      "description",
      "category",
      "advertiser",
      "startDate",
      "endDate",
      "tags",
    ],
  },
};
