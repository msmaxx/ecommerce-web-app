const Joi = require('joi');

const registerValidation = data => {
    const RegistrationSchema = Joi.object({
        email: Joi.string().min(6).required().email().messages(
            {
                'string.base': 'The email address entered does not meet the requirements!',
                'string.empty': 'No email address entered!',
                'string.min': 'Email address must be at least {#limit} characters long!',
                'any.required': 'Email address is required!',
            }),
        password: Joi.string().min(6).required().messages(
            {
                'string.base': 'The password you entered does not meet the requirements!',
                'string.empty': 'No password entered!',
                'string.min': 'Password must be at least {#limit} characters long!',
                'any.required': 'Password is required!',
            }),
        name: Joi.string().min(3).required().messages(
            {
                'string.base': 'The name you entered does not meet the requirements!',
                'string.empty': 'No name entered!',
                'string.min': 'Name must be at least {#limit} characters long!',
                'any.required': 'Name is required!',
            }),
        role: Joi.string()
    });

    return RegistrationSchema.validate(data);
};

const loginValidation = data => {
    const LoginSchema = Joi.object({
        email: Joi.string().min(6).required().email().messages(
            {
                'string.base': 'The email you entered does not meet the requirements!',
                'string.empty': 'No email entered!',
                'string.min': 'Email must be at least {#limit} characters long!',
                'any.required': 'Email is required!',
            }),
        password: Joi.string().min(6).required().messages(
            {
                'string.base': 'The password you entered does not meet the requirements!',
                'string.empty': 'No password entered!',
                'string.min': 'Password must be at least {#limit} characters long!',
                'any.required': 'Password is required!',
            })
    });

    return LoginSchema.validate(data);
};

const categoryValidation = data => {
    const categorySchema = Joi.object({
        name: Joi.string().required().messages(
            {
                'string.base': 'Category name is invalid!',
                'string.empty': 'Category name not specified!',
                'string.min': 'Category must be at least {#limit} characters!',
                'any.required': 'Category name is required!'
            }),
        slug: Joi.string().required().messages(
            {
                'string.base': 'Category identifier does not meet requirements!',
                'string.empty': 'Category identifier not specified!',
                'string.min': 'Identifier must be at least {#limit} characters!',
                'any.required': 'Category identifier is required!'
            })
    })

    return categorySchema.validate(data);
}

const itemValidation = data => {
    const itemSchema = Joi.object({
        name: Joi.string().required().messages(
            {
                'string.base': 'The product name does not meet the requirements!',
                'string.empty': 'Product name not specified!',
                'string.min': 'Product name must be at least {#limit} characters!',
                'any.required': 'Product name is required!',
            }),
        description: Joi.string().required().messages({
            'string.base': 'Product description does not match requirements!',
            'string.empty': 'Product description not included!',
            'string.min': 'Product description must be at least {#limit} characters!',
            'any.required': 'Product description is required!',
        }),
        quantity: Joi.string().required().messages({
            'string.base': 'Quantity of item does not meet requirements!',
            'string.empty': 'Product quantity not specified!',
            'string.min': 'Item quantity must be at least {#limit} characters!',
            'any.required': 'Product quantity is required!',
        }),
        price: Joi.number().required().messages({
            'number.base': 'The price of the product does not meet the requirements!',
            'number.empty': 'Product price not specified!',
            'number.min': 'Product price must be at least {#limit} characters!',
            'number.required': 'Product price is required!',
        }),
        image: Joi.string(),
        categoryId: Joi.number().required().messages({
            'number.base': 'Product category does not meet the requirements!',
            'number.empty': 'Product category not specified!',
            'number.required': 'Product category is required!',
        }),
    })

    return itemSchema.validate(data);
}

const cartItemValidation = data => {
    const cartItemSchema = Joi.object({
        price: Joi.number().required(),
        amount: Joi.number().required(),
        cartId: Joi.number().required(),
        userId: Joi.number().required(),
        itemId: Joi.number().required(),
    })

    return cartItemSchema.validate(data);
}

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
module.exports.categoryValidation = categoryValidation;
module.exports.itemValidation = itemValidation;
module.exports.cartItemValidation = cartItemValidation;