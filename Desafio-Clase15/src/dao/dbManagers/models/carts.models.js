import mongoose from 'mongoose';

const cartsColletion = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            quantity: { type: Number, default: 1 }
        }
    ]
});

export const cartsModel = mongoose.model(cartsColletion, cartsSchema);