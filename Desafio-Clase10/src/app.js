import express from "express";
import handlebars from 'express-handlebars'
import { __dirname } from './utils.js';
import { Server } from "socket.io";
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js'

const app = express();
app.use('/static-files', express.static(`${__dirname}/public`));

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