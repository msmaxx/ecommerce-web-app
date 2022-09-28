const {CartItem} = require('../models/models')
const ApiError = require('../error/ApiError');
const {cartItemValidation} = require("./validators/validation");

class CartItemsController {

    async create(req, res, next) {

        const {price, amount, cartId, itemId} = req.body

        const {error} = cartItemValidation(req.body);
        if (error) return next(ApiError.badRequest(error.details[0].message)).res.status(400);

        const cartItem = await CartItem.create({price, amount, cartId, itemId})

        try {
            return res.json(cartItem)
        } catch (err) {
            return next(ApiError.badRequest({message: err}))
        }
    }

    async getAllCartItemsById(req, res) {

        const {id} = req.params
        const cart = await CartItem.findAll({
            where: {cartId: id}
        })
        return res.json(cart)
    }

    async deleteFromCart(req, res) {
        const {id} = req.params

        const cart_item = await CartItem.destroy({where: {id: id}})
        return res.json(cart_item)
    }

}

module.exports = new CartItemsController()