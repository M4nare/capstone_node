var express = require('express');
const { helloAPI } = require('../controllers/index');
const { loginAPI } = require('../controllers/login');
const { locationAPI } = require('../controllers/location');
const { tagAPI } = require('../controllers/tag');
const { randomAPI } = require('../controllers/random');
const { listAPI } = require('../controllers/list');
const { userListAPI } = require('../controllers/userList');
const { deleteListAPI } = require('../controllers/deleteList');
const { ratingAPI } = require('../controllers/rating');


var router = express.Router();

router.get('/', helloAPI);
router.post('/login', loginAPI);
router.get('/location/:id', locationAPI);
router.post('/tag', tagAPI);
router.post('/random', randomAPI);
router.post('/list', listAPI);
router.get('/list/:userid', userListAPI);
router.delete('/list', deleteListAPI);
router.put('/put', ratingAPI);





module.exports = router;
