import express from "express";
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js'

import ProductManager from "./managers/ProductManagers.js";
import path from 'node:path';
const productsFilePath = path.join(__dirname, "./files/products.json");
const productManager = new ProductManager(productsFilePath);

const app = express();
app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);

const server = app.listen(8080, () => console.log('Listening server on port 8080') )

const io = new Server(server);

app.set('socketio', io);


io.on('connection', socket => {
    console.log('Nuevo cliente conectado');

    socket.on('addProduct', async (data) => {
        console.log(data)
        try {
            await productManager.addProduct(data);
            io.emit('showProducts', await productManager.getProducts());
        } catch (error) {
            console.error(error);
        }
    });

    socket.on('removeproduct', async (data) => {
        try {
            const id = Number(data)
            await productManager.deleteProduct(id);
            io.emit('showProducts', await productManager.getProducts());
        } catch (error) {
            console.error(error);
        }
    });

});
