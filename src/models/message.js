const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    text: {
        type: Text,
        //required: [true, "Message is required"]
    }

}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;