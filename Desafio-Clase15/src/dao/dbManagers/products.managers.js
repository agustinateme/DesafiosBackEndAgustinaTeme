import { productsModel } from '../dbManagers/models/products.models.js';

export default class Products {
    constructor() {
        console.log('Trabajando Products con la DB');
    }

    getProducts = async () => {
        const products = await productsModel.find();
        return products.map(p => p.toObject());
    }

    addProduct = async (product) => {
        const result = await productsModel.create(product);
        return result;
    }

    getProductById = async (id) => {
        const result = await productsModel.find({ _id: id });
        return result;
    }

    updateProduct = async (id, product) => {
        const result = await productsModel.updateOne({ _id: id }, product);
        return result;
    }

    deleteProduct = async (id) => {
        const result = await productsModel.deleteOne({ _id: id });
        return result;
    }
}