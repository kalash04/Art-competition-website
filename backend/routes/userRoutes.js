const express = require('express');
const { registerUser, loginUser, logoutUser  } = require('../controllers/userController');

const router = express.Router();

// Register and login routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get("/",(req,resp)=>{
    resp.send("you are all set");
})


module.exports = router;
