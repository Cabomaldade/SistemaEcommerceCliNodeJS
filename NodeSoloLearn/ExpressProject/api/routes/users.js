// user.js
const express = require ('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request of the /users'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request of the /users'
    });
});

module.exports = router;