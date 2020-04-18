let jwtDecode = require('jwt-decode');
const model = require('../Core/review');
const userModel = require('../Core/user');
module.exports = (express) => {
    let router = express.Router();
    router.use(async (req, res, next) => {
        if (req.method == `GET`)
            next();
        else {
            try {
                let token = req.headers.authorization;
                let decoded = jwtDecode(token);
                let email = decoded.email;
                let result = await userModel.findOne({ email: email })
                if (!result) {
                    res.statusCode = 403;
                    return res.send();
                } else
                    next();
            } catch (error) {
                res.statusCode = 403;
                return res.send(error);
            }
        }
    });
    router.post('/', async (req, res) => {
        try {
            let newObj = new model(req.body);
            let review = await newObj.save();
            res.send(review);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.get('/', async (req, res) => {
        try {
            let reviews = await model.find().populate('movieId', 'name')
            res.send(reviews);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.patch('/:id', async (req, res) => {
        try {
            let r = await model.findOne({ _id: req.params.id })
            let review = await model.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(`Review has been updated successfully  ${r}`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.delete('/:id', async (req, res) => {
        try {
            let review = await model.findByIdAndRemove({ _id: req.params.id });
            res.send(`Review has been deleted successfully`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    return router;
}