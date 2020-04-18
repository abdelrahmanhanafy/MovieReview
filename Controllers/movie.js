let jwtDecode = require('jwt-decode');
const model = require('../Core/movie');
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
            let movie = await newObj.save();
            res.send(movie);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.get('/', async (req, res) => {
        try {
            let movies = await model.find();
            res.send(movies);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.patch('/:id', async (req, res) => {
        try {
            let movie = await model.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(`Movie has been updated successfully`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });

    router.delete('/:id', async (req, res) => {
        try {
            let movie = await model.findByIdAndRemove({ _id: req.params.id });
            res.send(`Movie has been deleted successfully`);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    // router.get('/', async (req, res) => {
    //     console.log(req.query.filterBy)
    //     try {
    //         let movies = await model.find({ genre: req.query.filterBy })
    //         res.send(movies);
    //     }
    //     catch (error) { res.status(400).send(`Something went wrong`) }
    // });

    return router;
}

//sortBy=action,2000&filterBy=action