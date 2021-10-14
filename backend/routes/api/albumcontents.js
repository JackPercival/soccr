const express = require('express');
const asyncHandler = require('express-async-handler');
const { Album, User, Image, AlbumContent } = require('../../db/models');

const router = express.Router();

//Get all album contents
router.get('/', asyncHandler(async (req, res) => {
    const albumContents = await AlbumContent.findAll({
        include: {
            model: Image,
            include: User
        }
    });

    return res.json(albumContents)
}))

module.exports = router;
