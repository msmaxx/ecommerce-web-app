const sequalize = require('../db')
const DataTypes = require('sequelize')

const User = sequalize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},

    role: {type: DataTypes.STRING, defaultValue: "USER", allowNull: false},
})

const Cart = sequalize.define('cart', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const CartItem = sequalize.define('cartItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    price: {type: DataTypes.FLOAT, allowNull: true},
    amount: {type: DataTypes.INTEGER, allowNull: false}
})

const Item = sequalize.define('item', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    name: {type: DataTypes.STRING, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},

    image: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: true},
    quantity: {type: DataTypes.STRING, allowNull: true},

    active: {type: DataTypes.STRING, defaultValue: "TRUE", allowNull: false}
})

const Category = sequalize.define('category', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    slug: {type: DataTypes.STRING, unique: true, allowNull: false},
})

const Order = sequalize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    paymentMethod: {type: DataTypes.STRING, allowNull: false},
    paymentStatus: {type: DataTypes.STRING, allowNull: false},

    totalPrice: {type: DataTypes.FLOAT, allowNull: false},

    comment: {type: DataTypes.STRING, allowNull: true},
    status: {type: DataTypes.STRING, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
})

const OrderItems = sequalize.define('orderItem', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},

    price: {type: DataTypes.FLOAT, allowNull: false},
    amount: {type: DataTypes.INTEGER, allowNull: false},

    itemId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false},
})

User.hasOne(Cart)
Cart.belongsTo(User)

Order.hasMany(OrderItems)
OrderItems.belongsTo(Order)

Cart.hasMany(CartItem)
CartItem.belongsTo(Cart)

Category.hasMany(Item)
Item.belongsTo(Category)

Item.hasMany(CartItem)
CartItem.belongsTo(Item)

module.exports =
    {
        User,
        Cart,
        CartItem,
        Item,
        Category,
        Order,
        OrderItems,
    }