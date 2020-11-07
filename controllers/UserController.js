const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const saltHash = Number(process.env.SALT_HASH);

module.exports = {

    storage: async (req,res) => {

        function criaTokenJWT(user){
            const payload = {
                id: user._id
            };
            const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: 60 * 30 });
            return token
        }

        //utilizando desustructuring para adquirir os dados vindos via requisição
        let { nome, email, senha, telefones } = req.body

        //realizando o hash da senha com bcrypt
        senha = bcrypt.hashSync(senha, saltHash);
        //construindo usuario a partir dos dados obtidos da requisição
        let user = new User({nome,email,senha, telefones});

        //verificando a existência de cadastro de email
        let emailExistente = await User.findOne({ email });

        if(!emailExistente){
            try {
                await user.save();
                //com o usuario criado definimos o token jwt
                try {
                    const user = await User.findOne({ email })
                    token = criaTokenJWT(user)
                    user.token = token;
                    res.status(201).send(user);
                    user.save();
                } catch (error) {
                    res.status(500).send(error);
                }
            } catch (error) {
                res.send(error)
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


