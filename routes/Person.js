const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ['chef','waiter','manager','Coder'],
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
    },
    salary: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next){
    const person = this; 

    //hash the password only if it has been modified (or is new)

    if(!person.isModified('password')) return next();

    try{
        //hash password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password,salt);

        //override the plain password with hashed password
        person.password = hashedPassword;

        next();
    }catch{
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;

    }catch(err){
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;

