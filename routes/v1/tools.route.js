const express = require("express");
const viewCount = require("../../midleware/viewCount");
const limiter = require("../../midleware/limiter");
const router = express.Router();
toolsControler = require('../../controllers/tools.controller')





router
    .route('/')
    .get(toolsControler.getAllTools)
    .post(toolsControler.saveTool)


router
    .route('/:id')

    //router lavel midleware
    .get(viewCount, limiter, toolsControler.getToolDetails)
    .patch(toolsControler.updateTool)
    .delete(toolsControler.deleteTool)






module.exports = router;