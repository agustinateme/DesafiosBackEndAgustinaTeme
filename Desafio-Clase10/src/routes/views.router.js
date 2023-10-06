import { Router } from "express";
import ProductManager from '../managers/ProductManagers.js'
import { __dirname } from "../utils.js";
import path from 'node:path';

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);

const router = Router();

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



export default router;