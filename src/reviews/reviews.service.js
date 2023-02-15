const knex = require("../db/connection");

//set up a read function for validation in controller
function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first();
}

//gets critics for update in controller
function getCritics (critic_id) { 
    return knex('critics as c')
      .where({'c.critic_id': critic_id})
      .first();
}

//update review function
function update (updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
}

//delete review function
function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}

module.exports = {
    read,
    update,
    getCritics,
    delete: destroy,
}