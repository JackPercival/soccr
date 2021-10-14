const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images');
const commentsRouter = require('./comments');
const albumsRouter = require('./albums');
const albumContentsRouter = require('./albumcontents');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter);
router.use('/albumcontents', albumContentsRouter);

module.exports = router;
