const mongoose = require('mongoose');
let Schema = mongoose.Schema;
mongoose.connect('' /* <-- YOUR URL HERE */, { useNewUrlParser: true, useUnifiedTopology: true });
db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error de Mongoose:'));
db.once('open', function () {
  console.log("mongoose est co");
});

/*
      Schema de donnée pour un utilisateur
*/
const UserDataSchema = new mongoose.Schema({
  admin: Boolean,
  name: String,
  likesNbr: Number,
  dislikesNbr: Number,
});


const UserData = mongoose.model("UserData", UserDataSchema);    // model user 


async function createUser(name) {     //create users 
  const userdata = new UserData({
    admin : false,
    name: name,
    likesNbr: 0,
    dislikesNbr: 0
  });
  return await userdata.save();

}


async function getUserInfo(nameGiven) {    // getUserInfo 
  const userExist = await UserData.exists({ name: nameGiven });      // bool 

  if (userExist) {
    return await UserData.findOne({ name: nameGiven })
  }


  const userCreated = await createUser(nameGiven);

  return userCreated;
}

async function getUserById(id) {    // getUserInfo
  const userExist = await UserData.exists({ _id: id });      // bool 

  if (userExist) {
    return await UserData.findOne({ _id: id })
    
  }
  return null;
}


async function updateUser(name, newLikes, newDislikes) {    // UpdateUser
  const userExist = await UserData.exists({ name: name });
  const doc = await UserData.findOne({ name: name });    //return array d'object
  try {


    if (userExist) {
      doc.likesNbr = newLikes;
      doc.dislikesNbr = newDislikes;
      await doc.save();
      return true;
    }
    return false;
  }
  catch (err) {
    return false;
  }
}


module.exports = {
  getUserInfo,
  getUserById,
  updateUser
}


