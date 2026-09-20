const studController = require('../Apis/Controllers/studController');
const express = require('express');
const create = require('../Apis/Controllers/studController');
const router = express.Router();

// CRUD operations [methods of APIS]
// create : POST
// read : GET
// update : PUT
// delete : DELETE

router.post('/addStudent', studController.create);
module.exports = router;