const User = require('../model/User');
const bcrypt = require('bcrypt');

const saltosDoHash = 12;

module.exports = {

    storage: async (req,res) => {
        //utilizando desustructuring para adquirir os dados vindos via requisição
        let { nome, email, senha, telefones } = req.body

        //realizando o hash da senha com bcrypt
        senha = bcrypt.hashSync(senha, saltosDoHash);
        //construindo usuario a partir dos dados obtidos da requisição
        let user = new User({nome,email,senha, telefones});

        //verificando a existência de cadastro de email
        let emailExistente = await User.findOne({ email });

        if(!emailExistente){
            try {
                await user.save();
                res.status(201).send({mensagem:"Criado"})
            } catch (error) {
                res.send({message:error})
            }
        }else{
            res.status(400).send({mensagem:"E-mail já existente."})
        }
    },

    list: async (req,res) => {
        try {
           let users = await User.find({});
           res.status(200).send(users);
        } catch (error) {
            res.status(501).send(error);
        }

    }
}


