const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {  
    try {
        res.status(200).json({'confirm':'this is a confirmation message'})
    } catch (e) {
      res.status(500).render('error/error',{error: "not confirm!"});
    }
});

module.exports = router;