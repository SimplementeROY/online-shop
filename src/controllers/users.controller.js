const User = require("../models/users.model")
const bcrypt = require('bcryptjs');
const { createToken } = require("../utils/helpers");

const registerUsuario = async (req, res, next) => {

    try {
        req.body.password = await bcrypt.hash(req.body.password, 8)
        const result = await User.create(req.body)
        res.json(result)
    }
    catch (error) {
        next(error)
    }
}

const loginUsuario = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const usuario = await User.findOne({ email: email })
        if (!usuario) {
            return res.status(401).json({
                message: 'Error en usuario y/o contraseña'
            });
        }
        const iguales = bcrypt.compareSync(password, usuario.password)
        if (!iguales) {
            return res.status(401).json({
                message: 'Error en usuario y/o contraseña'
            });
        }

        res.json({
            message: 'Login correcto 🥳',
            token: createToken(usuario)
        })
    }
    catch (error) {
        next(error)
    }
}

const addProductCart = async (req, res, next) => {
    const { productId } = req.params;
    try {
        req.user.cart.push(productId);
        await req.user.save();
        res.json(req.user)
    }
    catch (error) {
        next(error)
    }
}

const getProfile = async (req, res, next) => {
    try {
        res.json(req.user);
    }
    catch (error) {
        next(error)
    }
}

module.exports = { loginUsuario, registerUsuario, addProductCart, getProfile }