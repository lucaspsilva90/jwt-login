const User = require('../model/User');
const Telefone = require('../model/Telefone');

module.exports = {

    storage: async (req,res) => {
        let user = new User(req.body);

        try {
            await user.save();
            res.status(201).send({message:"Criado"})
        } catch (error) {
            res.send({message:error})
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


