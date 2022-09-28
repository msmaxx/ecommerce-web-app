const {Category} = require('../models/models')
const ApiError = require('../error/ApiError')
const {categoryValidation} = require("./validators/validation");

class CategoryController {
    async create(req, res, next) {

        const {name, slug} = req.body

        const {error} = categoryValidation(req.body);
        if (error) return next(ApiError.badRequest(error.details[0].message)).res.status(400);

        const category = await Category.create({name, slug})

        try {
            return res.json(category)
        } catch (err) {
            return next(ApiError.badRequest({message: err}))
        }
    }

    async getAll(req, res) {

        const categories = await Category.findAll()
        return res.json(categories)
    }

    async getCategoryById(req, res) {

        const {id} = req.params
        const category = await Category.findOne(
            {
                where: {id},
            }
        )
        return res.json(category)
    }

}

module.exports = new CategoryController()