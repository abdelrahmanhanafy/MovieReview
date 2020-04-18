const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const model = require('../Core/user');
const Joi = require('joi');
module.exports = (express) => {
    let router = express.Router();
    router.post('/signup', async (req, res) => {
        try {
            let hash = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hash;
            let newObj = new model(req.body);
            let user = await newObj.save();
            res.send(user);

        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.post('/login', async (req, res) => {
        let email = req.body.email, password = req.body.password;
        const schema = { email: Joi.string().email().required(), password: Joi.string().required() };
        const { error } = Joi.validate(req.body, schema);
        if (error)
            return res.status(400).send(error.details[0].message);
        try {
            let _res = await model.findOne({ email: email })
            if (_res && bcrypt.compareSync(password, _res.password) == true) {
                let token = jwt.sign({ id: _res._id, email: _res.email }, config.get('Privatekey'));
                res.send(token);
            }
            else { res.status(400).send(`Something went wrong`) }
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    return router;
}