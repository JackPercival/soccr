const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images');
const commentsRouter = require('./comments');
const albumsRouter = require('./albums')

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/images', imagesRouter);
router.use('/comments', commentsRouter);
router.use('/albums', albumsRouter);

module.exports = router;
