const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const colorSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    colorName: {
        type: String,
        required: true
    },
    colorCode: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Color', colorSchema);
