const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("starting the application");
})


module.exports = router