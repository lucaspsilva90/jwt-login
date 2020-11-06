const mongoose = require('mongoose');
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0)
    mongoose.connect(require('../db/connection-config.js'))
        .catch(err => {
            console.error('mongoose Error', err)
        });

let TelefoneSchema = new Schema({
    numero: { type: String },
    ddd: {
        type: String,
        max: [ 3,{message:"Digite no máximo 3 caracteres"} ]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

TelefoneSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

TelefoneSchema.pre('update', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});

TelefoneSchema.pre('findOneAndUpdate', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});



/** @name db.Telefone */
module.exports = mongoose.model('Telefone', TelefoneSchema);
