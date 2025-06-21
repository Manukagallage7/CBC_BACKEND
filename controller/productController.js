import Product from '../models/product.js';

export function createProducts(req, res) {

    if(req.user == null){
        res.json({
            message: "You are LogIn"
        })
        return
    }

    if(req.user.type !== "Admin") {
        res.json({
            message: "You are not authorized to create products"
        })
        return
    }
    
    const product = new Product(req.body);
    product.save()
        .then(() => {
            res.json({ message: "Product Created" });
        })
        .catch((error) => {
            res.json({
                message: "Error creating product",
                error: error.message
            });
        });
}

export function getProducts(req, res) {
    Product.find()
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

export function deleteProducts(req, res) {
    Product.deleteOne({name : req.body.name})
        .then(() => {
            res.json({ message: "Product deleted successfully" });
        })
        .catch((error) => {
            res.json({ error: error.message });
        });
    }

export function getProductsByName(req, res) {

    Product.findOne({ name: req.params.name })
        .then((product) => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}

export function deleteProductsByName(req, res) {
    Product.deleteOne({ name: req.params.name })
        .then(() => {
            res.json({ message: "Product deleted successfully" });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}