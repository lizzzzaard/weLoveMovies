const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const theatersService = require("./theaters.service");

//list function
async function list(req, res, next) {
    const data = await theatersService.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}