const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

//validation that a review exists
async function reviewExists (req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if(review) {
        res.locals.review = review;
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found."
    });
}

// updates a review
async function update(req, res, next) {
    const review = res.locals.review.review_id;
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data,
        review_id: review,
    }
    await reviewsService.update(updatedReview);
    updatedReview.critic = await reviewsService.getCritics(updatedReview.critic_id);
    res.json({ data: updatedReview });
}

//destroys a review
async function destroy(req, res, next) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(reviewExists), update],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}