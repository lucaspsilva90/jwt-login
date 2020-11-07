const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {

    login: async (req,res) => {

        function criaTokenJWT(user){
            const payload = {
                id: user._id
            };
            const token = jwt.sign(payload, process.env.CHAVE_JWT, { expiresIn: 60 * 30 });
            return token
        }
        
        let { email, senha } = req.body;

        if(!email){
            return res.send({message:"Por favor envie um email valido."});
        }

        if(!senha){
            return res.send({message:"Por favor envie uma senha valida."});
        }

        try {
            //consulta incluindo a senha
            let user = await User.findOne({ email }).select("+senha");
            //validação usuario e senha
            if(!user){
                return res.status(401).send({message:"Usuário e/ou senha inválidos"})
            }
            if(!bcrypt.compareSync(senha, user.senha)){
                return res.status(401).send({message:"Usuário e/ou senha inválidos"})
            }
            //definindo o último login do usuario
            user.ultimo_login = Date();

            //criando uma nova token
            let token = criaTokenJWT(user)    
            user.token = token
            //setando o cabecalho com o valor da token
            res.set("authorization", token)
            await user.save();
            //retornando o usuario atualizado
            const userFinal = await User.findOne({ email })
            return res.status(200).json(userFinal);

        } catch (error) {
            return res.status(500).send({message:"Erro desconhecido"})
        }
        
    }
}