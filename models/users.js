var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate
    },
    username: String,
    password: String,
    email: String,
    creat_time: { 
    	type: Date, 
    	default: Date.now 
    },
    group: { 
    	type: String, 
    	default: "0" 
    },
    scope: {
        type: Array,
        default: ['email']
    }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;

