import { Router } from "express";
import Carts from '../dao/dbManagers/carts.managers.js';

const router = Router();
const cartManager = new Carts();

router.post('/', async (req, res) => {
    const cart = { products: [] };
    const result = await cartManager.addCart(cart);
    res.send({ status: 'success', payload: result });
});

router.get('/:cid', async (req, res) => {
    try {
        const id = Number(req.params.cid);
        const cart = await cartManager.getCartById(id);
        res.send({ status: 'success', payload: cart.products });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCart = Number(req.params.cid);
        const idProduct = Number(req.params.pid);

        // Verifica si el producto ya existe en el carrito
        const existingProduct = await cartManager.getCartById(idCart);

        if (existingProduct.products.some(product => product.id === idProduct)) {
            // Si el producto ya existe, aumento su cantidad en 1
            const cant = existingProduct.products.find(product => product.id === idProduct).quantity;
            const result = await cartManager.updateCart(idCart, { id: idProduct, quantity: cant + 1 });
            res.status(200).send({ status: 'success', payload: result });
        } else {
            // Si el producto no existe, agrégalo al carrito con cantidad 1
            const result = await cartManager.updateCart(idCart, { id: idProduct, quantity: 1 });
            res.status(200).send({ status: 'success', payload: result });
        }
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;