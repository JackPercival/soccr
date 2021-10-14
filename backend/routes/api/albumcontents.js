const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Image, AlbumContent } = require('../../db/models');

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

//Add album content
router.post('/', asyncHandler(async (req, res) => {
    const { image_id, album_id } = req.body;

    const content = await AlbumContent.create({
        image_id,
        album_id
    });

    return res.json(content)
  }))

module.exports = router;
