const { min } = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

if (mongoose.connection.readyState === 0)
    mongoose.connect(require('../db/connection-config.js'))
        .catch(err => {
            console.error('mongoose Error', err)
        });

let UserSchema = new Schema({
    nome: {
        type: String,
        required: [true, "Por favor, digite um nome válido."],
        min: [3, "Precisa ter um nome maior que 3 letras"]
    },
    email: {
        type: String,
        required: [true, "Por favor, insira um e-mail."]
    },
    senha: {
        type: String,   
        required: [true, "Por favor, insira uma senha."],
        select: false
    },
    telefones: [{
        ddd: {
            type: String,
            required: [true, "Por favor digite um DDD"],
            min: [2, "Um DDD deve ter no mínimo 2 dígitos"],
            max: [3, "Um DDD não deve ter mais que 3 dígitos"]
        },
        numero: { 
            type: String,
            required: [true, "Por favor, digite o numero de telefone."]
        }
    }],
    data_criacao: { type: Date, default: Date.now },
    data_atualizacao: { type: Date, default: Date.now },
    ultimo_login: { type : Date, default: Date.now },
    token: { type : String, default: undefined }
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
