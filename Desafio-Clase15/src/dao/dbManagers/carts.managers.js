import { cartsModel } from '../dbManagers/models/carts.models.js';

export default class Carts {
    constructor() {
        console.log('Trabajando Carts con la DB');
    }

    getCart = async () => {
        const result = cartsModel.find().lean();
        return result;
    }

    addCart = async (cart) => {
        const result = cartsModel.create(cart);
        return result;
    }

    getCartById = async (id) => {
        const result = cartsModel.find({ _id: id });
        return result;
    }

    updateCart = async (id, product) => {
        const result = cartsModel.updateOne({ _id: id }, product);
        return result;
    }

    deleteCart = async (id) => {
        const result = await cartsModel.deleteOne({ _id: id });
        return result;
    }
}