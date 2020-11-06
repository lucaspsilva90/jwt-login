const User = require('../model/User');
const bcrypt = require('bcrypt');

module.exports = {

    login: async (req,res) => {
        let { email, senha } = req.body;

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
            
            user = await User.findOne({ email });
            return res.json(user);
        } catch (error) {
            return res.status(500).send({message:error})
        }
        
    }
}