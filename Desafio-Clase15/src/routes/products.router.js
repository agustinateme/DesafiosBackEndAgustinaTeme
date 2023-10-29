import { Router } from "express";
import Products from '../dao/dbManagers/products.managers.js';

const router = Router(); 
const productManager = new Products();

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send({ status: 'success', payload: products });
    }
    catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);
        const product = await productManager.getProductById(id);
        res.send({ status: 'success', payload: product });
    }
    catch (error) {
        res.status(500).send({ status: 'error', error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.send({ status: 'success', payload: product });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }

});

router.put('/:pid', async (req, res) => {
    try {

        const { title, description, price, thumbnail, code, stock, status, category } = req.body;

        if (!title || !description || !price || !code || !stock || !status || !category) {
            return res.status(400).send({ status: 'error', message: 'incomplete values' });
        }
        
        const product = { title, description, price, thumbnail, code, stock, status, category };

        const id = Number(req.params.pid);

        if (isNaN(id)) {
            return res.status(400).send({ status: 'error', message: 'Invalid product ID' });
        }

        await productManager.updateProduct(id, product);

        res.send({ status: 'success', payload: product });
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});

export default router;