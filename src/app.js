if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router")

app.use(cors())
app.use(express.json());

app.use("/movies", moviesRouter);;
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);


//Error handler if route does not exist
app.use((req, res, next) => {
    return next({
        status: 404,
        message: `Not found : ${req.originalUrl}`
    });
});

//Error handler if HTTP method does not exists
app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = error;

    res.status(status).json({ error: message });
})



module.exports = app;
