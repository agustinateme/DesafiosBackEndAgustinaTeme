import { Router } from "express";
import ProductManager from '../managers/ProductManagers.js'
import { __dirname } from "../utils.js";
import path from 'node:path';

const router = Router();

const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);


router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        const cant = req.query.limit;

        if (!cant) return res.send(products);

        if (isNaN(cant)) return res.status(404).send({ error: 'ingrese un numero' })

        const filteredProducts = products.slice(0, cant);
        res.send(filteredProducts);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);
        const product = await productManager.getProductById(id);
        res.send(product);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
   
});

router.post('/', async (req, res) => {
    try {
        const product = req.body;
        await productManager.addProduct(product);
        res.status(200).send({ status: 'success', payload: product });
       
        //nuevo código para el desafio10
        const io = req.app.get('socketio');
        io.emit('showProducts', await productManager.getProducts());
    }
    catch(error) {
        res.status(400).send({ error: error.message });
    }
    
});

router.put('/:pid', async (req, res) => {
    try {
        const product = req.body;
        const id = Number(req.params.pid);
        await productManager.updateProduct(id, product);

        res.send({ status: 'success', payload: await productManager.getProductById(id) });
    }
    catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const id = Number(req.params.pid);
        await productManager.deleteProduct(id);

        res.status(200).send({ status: 'success' });

        //nuevo código para el desafio10
        const io = req.app.get('socketio');
        io.emit('showProducts', await productManager.getProducts());
    }
    catch (error) {
        res.status(400).send({ error: error.message }); 
    }
});






export default router;