import express from "express";
import ProductManager from "./ProductManager.js";

import path from 'node:path';
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, "./products.json");

const app = express();

const productManager = new ProductManager(productsFilePath);

app.use(express.urlencoded({ extended: true }));
                         
app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();  
    const cant = req.query.limit;
    
    //si en el path limit no se ingreso nada retorna todos los productos
    if (!cant) return res.send(products);

    //si en el path limit no se ingresó un número, retorna un mensaje de error
    if (isNaN(cant)) return res.status(404).send({error: 'ingrese un numero'})

    //creo un objeto con la cantidad pasada en el path de elementos
    const filteredProducts = products.slice(0, cant);
    res.send(filteredProducts);
})

app.get('/products/:pid', async (req, res) => {
    const id = Number(req.params.pid);
    const product = await productManager.getProductById(id);
    
    if (!product) return res.status(404).send({error: 'producto no encontrado'})
    
    res.send(product);
})


app.listen(8080, () => console.log('Listening on port 8080'));
