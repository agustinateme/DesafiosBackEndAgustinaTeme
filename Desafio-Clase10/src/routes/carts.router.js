import { Router } from "express";
import CartManager from '../managers/CartManagers.js'
import ProductManager from '../managers/ProductManagers.js'
import { __dirname } from "../utils.js";
import path from 'node:path';

const router = Router();

const productsFilePath = path.join(__dirname, "./files/carts.json");
const cartManager = new CartManager(productsFilePath);

const productsFilePath2 = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath2);

router.post('/', async (req, res) => {
    await cartManager.addCart();
    res.send({ status: 'success'});
});

router.get('/:cid', async (req, res) => {
    try {
        const id = Number(req.params.cid);
        const products = await cartManager.getCartById(id);
        res.send({ status: 'success', payload: products.products });
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        // Verifica si el producto existe antes de actualizar el carrito
        const product = await productManager.getProductById(idProduct);

        await cartManager.updateCart(idCart, idProduct);
        res.status(200).send({ status: 'success' })
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;