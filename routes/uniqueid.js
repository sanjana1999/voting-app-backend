const router = require('express').Router();
let uniqueid = require('../model/uniqueid.model');

router.route('/signin').post(async function(req, res){
    const idExist = await uniqueid.findOne({unique: req.body.unique});
    if (idExist){
        return res.status(400).send('Enter unique Id');
    }
    let unique = new uniqueid(req.body);
    unique.save(function(err, savedid){
        if(err){
            console.log(err);
            return res.status(500).send("Some problem occured!");
        }
        return res.status(200).send(savedid);
    });
});

module.exports = router;