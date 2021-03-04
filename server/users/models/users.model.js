/*
These are the models that will be called in the controller for a given route.
*/

const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;
const functions = require('./functions');
mongoose.set('useFindAndModify', false);

//Setting up database schema.

const userSchema = new Schema({
    email: String,
    password: String,
    number: String,
    time: String,
    city: String,
    state: Boolean
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

const User = mongoose.model('Users', userSchema);

//Find user by ID.
exports.findById = (id) => {
    return User.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

//Create new user in database with userData.
exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

//Update user's information in database.
exports.patchUser = (email, userData) => {
    return User.findOneAndUpdate({
        _email: email
    }, userData);
};

//Remove an user based on his/her id.
exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteMany({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

//Get temperature of a city.
exports.check = async (city) => {
    city = city.toLowerCase();
    let temp = await functions.getData(city);
    return(temp);
};

//Find user based on email.
exports.findByEmail = async (email) => {
    return User.find({email: email});
};

//Subscribe to notifications with given data.
exports.subscribe = async (city, number, email, time, state) => {
    functions.subscribeTextNotifs(city, number, time, state);
    functions.subscribeEmailNotifs(city, email, time, state);
};

//Verify if city is truly a city or not.
exports.verifyCity = async (city) => {
    let state = await functions.verifyCity(city);
    return(state);
};