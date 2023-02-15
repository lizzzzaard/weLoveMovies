const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

// if the movie is showing at a specified theater, then only those movies will be displayed, otherwise all of the movies are displayed
function list(is_showing) {
    if(is_showing === "true"){
        return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .select("m.*")
        .distinct()
        .where({ "mt.is_showing": true });
    } else {
    return knex("movies").select("*");
    }
}

// read function for movies
function read(movie_id) {
    return knex("movies as m")
        .select("m.*")
        .where({ "movie_id": movie_id})
        .first()
}

// read function that depends on the theater
function readTheatersByMovie(movie_id) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select(
            "t.*", 
            "mt.is_showing",
            "mt.movie_id"
            )
        .where({ "mt.movie_id": movie_id })
}

//using the reduceProperties helper function to nest the critic information under a new "critic" key
const reduceReview = reduceProperties("review_id", {
    critic_id: ["critic", "critic_id"],
    preferred_name: ["critic", "preferred_name"],
    surname: ["critic", "surname"],
    organization_name: ["critic", "organization_name"],
    created_at: ["critic", "created_at"],
    updated_at: ["critic", "updated_at"],
})

//read function by reviews
function readReviewsByMovie(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select(
            "r.*",
            "c.*"
        )
        .where({ "r.movie_id": movie_id })
        .then(reduceReview)
}

module.exports = {
    list,
    read,
    readTheatersByMovie,
    readReviewsByMovie,
}