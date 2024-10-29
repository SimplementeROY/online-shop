const Product = require("../models/products.model")

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        req.body.owner = req.user._id;
        const result = await Product.create(req.body);
        res.status(201).json(result)
    } catch (error) {
        next(error)
    }
}


const updateProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const result = await Product.findByIdAndUpdate({ _id: productId }, req.body, { new: true });
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}


const deleteProduct = async (req, res, next) => {
    const { productId } = req.params;
    try {
        const result = await Product.findByIdAndDelete(productId);
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

const getProductDepartment = async (req, res, next) => {
    const { department } = req.params;
    try {
        const result = await Product.find({ department: department });
        res.json(result);
    }
    catch (error) {
        next(error)
    }
}

const getProductsByPrice = async (req, res, next) => {

    const { min = 0, max = 100000 } = req.query;

    try {
        const result = await Product.find({
            price: { $gte: min, $lte: max }
        })

        res.send(result)
    }
    catch (error) {
        next(error)
    }
}

const getAvailableProducts = async (req, res, next) => {

    try {
        const result = await Product.find({
            available: true,
            stock: { $gte: 10 }
        })

        res.json(result)
    }
    catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    const { productId } = req.params
    try {
        const result = await Product.findById(productId);
        res.json(result);
    }
    catch (error) {
        next(error)
    }
}

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDepartment, getProductsByPrice, getAvailableProducts, getProductById }