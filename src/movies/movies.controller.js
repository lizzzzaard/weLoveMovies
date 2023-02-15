const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");

//validation if a movie exists
async function movieExists (req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if(movie) {
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: "Movie cannot be found."
    });
}

//list function for movies
async function list(req, res, next) {
    const data = await moviesService.list(req.query.is_showing);
    res.json({ data });
}

//read function for movies
async function read(req, res, next) {
    const { movie: data } = res.locals;
    res.json({ data });
}

//read function for theaters by movies
async function readTheatersByMovie(req, res, next) {
    res.json({ data: await moviesService.readTheatersByMovie(req.params.movieId)});
}

//read function for reviews by movies
async function readReviewsByMovie(req, res, next) {
    const review = await moviesService.readReviewsByMovie(req.params.movieId)
    res.json({ data: review })
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    readTheatersByMovie: asyncErrorBoundary(readTheatersByMovie),
    readReviewsByMovie: asyncErrorBoundary(readReviewsByMovie),
}