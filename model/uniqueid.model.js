const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let uniqueid = new Schema({
    unique:{
        type:String
    },
});

module.exports = mongoose.connection.model('uniqueid', uniqueid);
