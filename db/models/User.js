const mongoose = require('mongoose');
const Telefone = require('./Telefone.js');
const Schema = mongoose.Schema;
if (mongoose.connection.readyState === 0)
    mongoose.connect(require('../connection-config.js'))
        .catch(err => {
            console.error('mongoose Error', err)
        });

let UserSchema = new Schema({
    nome: {
        type: String,
        required: [true, {message: "O usuário precisa de um nome."}],
        min: [3, {message:"O nome deve conter ao menos 3 letras."}]
    },
    email: {
        type: String,
        required: [true, {message: "Por favor, insira um e-mail."}]
    },
    senha: {
        type: String,
        required: [true, {message: "Por favor, insira uma senha."}]
    },
    telefones: {
        type: [Telefone]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

UserSchema.pre('update', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});

UserSchema.pre('findOneAndUpdate', function () {
    this.constructor.update({_id: this._id}, { $set: { updatedAt: Date.now() } });
});

/** @name db.User */
module.exports = mongoose.model('User', UserSchema);
