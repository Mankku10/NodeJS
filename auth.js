const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./routes/Person');

//Middleware function
  
  passport.use(new LocalStrategy(async(USERNAME,PASSWORD,done)=>{
    //Authentication logic here
    try{
      console.log('Received Credentials: ' , USERNAME,PASSWORD);
      const user = await Person.findOne({username: USERNAME}); 
      if(!user)
        return done(null, false, {message: 'Incorrect username. '});
  
      const isPasswordMatch = await user.comparePassword(PASSWORD);
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null, false, {message: 'Incorrect Password. '});
      }
    }catch(err){
      return done(err);
    }
  }))
  
  module.exports = passport;