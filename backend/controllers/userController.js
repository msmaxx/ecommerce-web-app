const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Cart} = require('../models/models')
const {registerValidation, loginValidation} = require('./validators/validation');

const generateJwt = (id, name, email, role) => {
    return jwt.sign(
        {id, name, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {

        const {error} = registerValidation(req.body);
        if (error) return next(ApiError.badRequest(error.details[0].message)).res.status(400);

        const {name, email, password, role} = req.body

        const emailExist = await User.findOne({where: {email}});
        if (emailExist) return next(ApiError.badRequest('A user with this email already exists!')).res.status(400);

        const hashPassword = await bcrypt.hash(password, 5)

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role,
        })
        await Cart.create({userId: user.id})

        const token = generateJwt(user.id, user.name, user.email, user.role)

        try {
            return res.json({token})
        } catch (err) {
            return next(ApiError.badRequest({message: err}))
        }
    }

    async login(req, res, next) {
        const {email, password} = req.body

        const {error} = loginValidation(req.body);
        if (error) return next(ApiError.badRequest(error.details[0].message)).res.status(400);

        const user = await User.findOne({where: {email}})

        if (!user) {
            return next(ApiError.internal('User not found!'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)

        if (!comparePassword) {
            return next(ApiError.internal('Incorrect password!'))
        }

        const token = generateJwt(user.id, user.name, user.email, user.role)

        try {
            return res.json({token})
        } catch (err) {
            return next(ApiError.badRequest({message: err}))
        }
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.name, req.user.email, req.user.role)
        return res.json({token})
    }

    async getAll(req, res) {
        const usersData = await User.findAll()
        return res.json(usersData)
    }

    async getOne(req, res) {
        const {id} = req.params
        const userData = await User.findOne(
            {
                where: {id},
            }
        )
        return res.json(userData)
    }
}

module.exports = new UserController()