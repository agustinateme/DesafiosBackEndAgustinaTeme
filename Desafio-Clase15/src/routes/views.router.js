import { Router } from "express";
import Products from '../dao/dbManagers/products.managers.js';
import Carts from '../dao/dbManagers/carts.managers.js'

const router = Router();

const productManager = new Products();
const cartManager = new Carts();

router.get('/products-view', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('products', { products });
    } catch (error) {
        console.error(error.message);
    }
});

router.get('/carts-view', async (req, res) => {
    try {
        const carts = await cartManager.getCart();
        res.render('carts', { carts });
    } catch (error) {
        console.error(error.message);
    }
});
/*
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {
        style: 'index.css'
    });
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', {
            style: 'index.css',
            products
        });
    } catch (error) {
        res.status(500).send('Error al cargar los productos');
    }
});
*/
export default router;