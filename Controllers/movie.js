let jwtDecode = require('jwt-decode');
const model = require('../Core/movie');
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
            }
            catch (error) {
                res.statusCode = 403;
                return res.send(error);
            }
        }
    });
    
    //CRUD Endpoints
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
            if (req.query.sortBy && req.query.filterBy) {
                let sortitems = req.query.sortBy.split(',');
                let filteritems = req.query.filterBy.split(',');
                let sortedFilteredmovies = await model.find({ genre: filteritems[0], year: filteritems[1] }).sort({ name: sortitems[0], genre: sortitems[1] }).populate('reviews', '-_id title rate')
                res.send(sortedFilteredmovies);
            }
            else if (req.query.sortBy) {
                let sortitems = req.query.sortBy.split(',');
                let sortedMovies = await model.find().sort({ name: sortitems[0], genre: sortitems[1] }).populate('reviews', '-_id title rate')
                res.send(sortedMovies);
            }
            else if (req.query.filterBy) {
                let filteritems = req.query.filterBy.split(',');
                let filteredMovies = await model.find({ genre: filteritems[0], year: filteritems[1] }).populate('reviews', '-_id title rate')
                res.send(filteredMovies);
            }
            else {
                let movies = await model.find().populate('reviews', '-_id title rate')
                res.send(movies);
            }

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


    return router;
}



