const jwt = require('jsonwebtoken');
const moment = require('moment');
const User = require('../model/User');

module.exports = async (req, res, next)  => {

    function calculaDiferencaUltimoLogin(user){
        const agora = moment(new Date());
        const ultimoLogin = moment(user.ultimo_login);
        const tempoPassado = moment.duration(agora.diff(ultimoLogin));
        return tempoPassado.asMinutes();
    }

    const { _id } = req.params
    if(!_id){
        res.status(401).send({message:"Por favor, forneça o id do usuário."});
    }
    
    const user = await User.findOne({ _id })

    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Por favor, envie o token no header da requisição' });
    if(user.token != token) return res.status(401).json({message: "Não autorizado"});

    const tempoUltimoLogin = calculaDiferencaUltimoLogin(user);
    if(tempoUltimoLogin >= 30){
        return res.status(401).json({message: "Sessão inválida"});
    }
    
    jwt.verify(token, process.env.CHAVE_JWT, (err, decoded) => {
      if (err) return res.status(500).json({ message: 'Não autorizado' });
      next();
    });
}

