import mongoose from 'mongoose';

const messagesColletion = 'messages';

const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true
    },
    
    message: {
        type: String,
        required: true
    }
});

export const messagesModel = mongoose.model(messagesColletion, messagesSchema);