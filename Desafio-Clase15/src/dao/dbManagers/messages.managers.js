import { messagesModel } from '../dbManagers/models/messages.models';

export default class Messages {
    constructor() {
        console.log('Trabajando Messages con la DB');
    }

    getMessage = async () => {
        const result = messagesModel.find();
        return result;
    }

    addMessage = async (message) => {
        const result = cartsModel.create(message);
        return result;
    }
}