let jwtDecode = require('jwt-decode');
const model = require('../Core/review');
const movieModel = require('../Core/movie');
const userModel = require('../Core/user');
module.exports = (express) => {
    let router = express.Router();
    //Middleware For authentication && authorization
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
                }
                else next();
            } catch (error) {
                res.statusCode = 403;
                return res.send(error);
            }
        }
    });
    
    //CRUD Endpoints
    router.post('/', async (req, res) => {
        try {
            let newObj = new model(req.body);
            let review = await newObj.save();
            let movie = await movieModel.findOne({ _id: review.movieId })
            movie.reviews.push(review)
            let Updatemovie = await movieModel.findOneAndUpdate({ _id: movie._id }, movie);
            res.send(review);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    router.get('/', async (req, res) => {
        try {
            let reviews = await model.find().populate('movieId', 'name  -_id')
            res.send(reviews);
        }
        catch (error) { res.status(400).send(`Something went wrong`) }
    });
    router.patch('/:id', async (req, res) => {
        try {
            let review = await model.findOneAndUpdate({ _id: req.params.id }, req.body);
            res.send(`Review has been updated successfully`);
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