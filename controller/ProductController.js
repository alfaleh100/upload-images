const Product = require('../model/ProductModel');
const resizeImage = require('../helpers/resizeImages');

class ProductController {
    // static async index(req, res) {
    //     const productModel = new Product()
    //     const products = await productModel.getAll()
    //     return res.status(200).json(products);
    // }

    // static async view(req, res) {
    //     try {
    //         const productModel = new Product();
    //         const product = await productModel.findOne(req.params.id) // <-- find by ID
    //         if (!product) return res.status(404).json({ error: 'Product not found' });
    //         res.json(product);
    //     } catch (err) {
    //         res.status(500).json({ error: 'Something went wrong' });
    //     }
    // }

    // static async name(req, res) {
    //     try {
    //         const productModel = new Product();
    //         const name = await productModel.getName(req.params.id)
    //         res.json({name});
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({ error: 'Something went wrong' });
    //     }
    // }

    static async create(req, res) {
        const productData = req.body;
        console.log(req.files.length)

        const fileName = await resizeImage(req.file.buffer, 'avatars')
        productData.image = fileName
        const productModel = new Product()
        await productModel.create(productData)
        return res.status(201).json({message: req.t('product_created', {name: req.body.name}), product: req.body});
    }

        static async creates(req, res) {
        const productData = req.body;
        console.log(req.files.length)
        const productModel = new Product()
        const images = [];

        for(let i = 0; i<req.files.length; i++){
        const fileName = await resizeImage(req.files[i].buffer, 'avatars')
        images.push(fileName)
        }
        productData.images = images;
        await productModel.create(productData)

        return res.status(201).json({message: req.t('product_created', {name: req.body.name}), product: req.body});
    }

    // static async update(req, res) {
    //     const productModel = new Product()
    //     const product = await productModel.update(req.params.id, req.body)
    //     return res.status(200).json(product);
    // }

    // static async delete(req, res) {
    //     try {
    //         const productModel = new Product()
    //         const deletedProduct = await productModel.delete(req.params.id);

    //         if (!deletedProduct) {
    //             return res.status(404).json({ error: 'Product not found' });
    //         }
    //         res.json({ message: 'Product deleted successfully' });
    //     } catch (err) {
    //         res.status(500).json({ error: 'Failed to delete product' });
    //     }
    // }
}


module.exports = ProductController;