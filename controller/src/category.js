const _ = require('lodash');
const RESOURCE_NAMES = require('../../config/auth/resource_names');
const errors = require('../../helpers/errors');
const express = require('express');
const router = express.Router();
const categoryService = require('../../services/core/CategoryService');
const {categorySchema, idSchema} = require('../../validations/validation');
const BaseController = require('../BaseController');


router.post('/', async (req, res, next) => {
    try {
        await req.authorize(req.user, RESOURCE_NAMES.CATEGORY, ['createAny']);
        const data = req.body;
        req.validate(categorySchema, data);
        const response = await categoryService.create(data);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        await req.authorize(req.user, RESOURCE_NAMES.CATEGORY, ['readAny']);
        const filters = req.query;
        const params = req.query;
        const response = await categoryService.getCategories(filters, params);
        res.send(response);
    } catch (err) {
        next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        await req.validate(idSchema, {id: req.params.id});
        await req.authorize(req.user, RESOURCE_NAMES.CATEGORY, ['readAny']);
        const response = await categoryService.getone(req.params.id);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await req.validate(idSchema, {id: req.params.id});
        await req.authorize(req.user, RESOURCE_NAMES.CATEGORY, ['updateAny']);
        const data = req.body;
        req.validate(categorySchema, data, false);
        const response = await categoryService.updateCategory(data, req.params.id);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await req.validate(idSchema, {id: req.params.id});
        await req.authorize(req.user, RESOURCE_NAMES.CATEGORY, ['deleteAny']);
        const response = await categoryService.deleteCategory(req.params.id);
        res.send(response);
    } catch (err) {
        next(err);
    }
});

module.exports = new BaseController('/categories', 'private', router);

//Done Documentation
