const path = require('path')
const {Item} = require('../models/models')
const ApiError = require('../error/ApiError')
const {itemValidation} = require("./validators/validation");

class ItemController {
    async create(req, res, next) {

        let {name, price, categoryId, description, quantity} = req.body

        const {error} = itemValidation(req.body);
        if (error) return next(ApiError.badRequest(error.details[0].message)).res.status(400);

        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))

        const item = await Item.create({
            name,
            price,
            categoryId,
            image: fileName,
            description,
            quantity,
        });

        try {
            return res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getAll(req, res) {

        const {categoryId, active} = req.query
        let items;
        if (!categoryId) {
            items = await Item.findAll()
        }
        if (categoryId) {
            items = await Item.findAll({where: {categoryId}})
        }
        if (active) {
            items = await Item.findAll({where: {active}})
        }
        if (!active) {
            items = await Item.findAll()
        }
        if (categoryId && active) {
            items = await Item.findAll({where: {categoryId, active}})
        }
        return res.json(items)
    }

    async getOne(req, res) {

        const {id} = req.params
        const item = await Item.findOne(
            {
                where: {id},
            }
        )
        return res.json(item)
    }

    async updateItemData(req, res) {

        const {id, name, description, price, quantity, categoryId} = req.params

/*        const {image} = req.files
        let fileName = uuid.v4() + ".jpg"
        image.mv(path.resolve(__dirname, '..', 'static', fileName))*/

        const order = await Item.update(
            {
                name: name,
                description: description,
                price: price,
                quantity: quantity,
                categoryId: categoryId,
                /*image: fileName,*/
            },
            {
                where: {id: id}
            }
        )
        return res.json(order)
    }
}

module.exports = new ItemController()