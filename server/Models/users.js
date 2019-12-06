var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt = require('bcrypt-nodejs');

////User Schema
var usersSchema = mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    trim: true
  },
  name: {
        type: String,
        required: true
      },
  password: String,
  email:String,
  gender: String,
  phoneNumber: {
        type: Number,
        required: true
      },
  address: String,
  age: {
        type: Number,
        required: true
      },
  nationality: String,
  rate: [Number],
  image: String
},
{  usePushEach: true});

//User Model
var Users = mongoose.model('Users', usersSchema);


////hashing the password
var hashPassword = function(password, callback) {
  const saltRounds = 10;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(password, salt);
  callback(hash);
  };
var createUsers = function(data, callback){
  var userdata = data;
  //////add the hashed password to the data
  hashPassword(data.password, function(hashed){
    userdata["password"] = hashed;
  });
  if (userdata.image.length === 0) {
    if (userdata.gender === "Female") {
      userdata.image = 'https://cdn2.iconfinder.com/data/icons/rcons-user/32/female-shadow-circle-512.png';    
    } else {
      userdata.image = "https://cdn1.iconfinder.com/data/icons/social-messaging-productivity-1-1/128/gender-male2-512.png";
    }    
  }

  ///save to database
  Users.create(userdata, callback);
};
var getUser = function(userName, password, callback){
  ///query for checking the usename
  var query = Users.where({ userName: userName });
  query.findOne(function(err, userdata){
    if(err){
      callback(err,null)
    } else {
      if(userdata){
          ////checking the password
        if(bcrypt.compareSync(password, userdata.password)){
        //retrieve the data if the user is exist 
        callback(null, userdata);
      }
        else{
          callback("wrong password", null);
        }
      }else{
        callback("Invalid User Name", null);
      }
    
      
      }
  });
};

var getUserInfo= function(userName, callback){
  ///query for checking the usename
  var query = Users.where({ userName: userName });
  query.findOne(function(err, userdata){
    if(err){
      callback(err,null)
    } else {

        callback(null, userdata);
      }
  });
};
var updateUsers = function(userName, updatedData, callback){
  Users.findOneAndUpdate({userName: userName}, {$set: updatedData}, callback)
};
///update user info based on the user name
var deleteUser = function(userName, callback){
  ///delete user
  Users.deleteOne({userName:userName}, callback)
}

var postRating= function(userName, rate, callback){
  console.log('users')
   Users.findOne({userName:userName}).exec(callback)
}
module.exports.Users = Users;
module.exports.createUsers = createUsers;
module.exports.updateUsers = updateUsers;
module.exports.deleteUser = deleteUser;
module.exports.getUser = getUser;
module.exports.getUserInfo = getUserInfo;
module.exports.postRating= postRating;


