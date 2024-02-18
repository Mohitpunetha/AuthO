const { Users } = require('../model/user');

/** Adding user and study mapping in database */
module.exports.createUserProfile = (payload) =>{
  return new Promise((resolve, reject)=>{
    Users.create(payload)
    .then((result)=> {
      resolve(JSON.parse(JSON.stringify(result)));
    })
    .catch((err)=> {
    reject('Error in createUserProfile: ' + err.message);
    });
  });
}


module.exports.getUserDetail = (searchQuery) => {
  return new Promise((resolve, reject) => {
    Users.findOne(searchQuery)
    .then(result => {
      resolve(JSON.parse(JSON.stringify(result)));
    })
    .catch(err => {
      console.log(err);
      reject('getUserDetail',err.message);
    });
  });
}

module.exports.getUserList =(searchQuery) => {
  return new Promise((resolve, reject) => {
    Users.findAll(searchQuery)
    .then(result => {
      resolve(JSON.parse(JSON.stringify(result)));
    })
    .catch(err => {
      console.log(err);
      reject('getUserList', err.message);
    });
  });
}

module.exports.updateUserDetail = (updateQuery, searchQuery) =>{
  return new Promise((resolve, reject)=>{
    Users.update(updateQuery, searchQuery)
    .then((result) => {
      resolve(JSON.parse(JSON.stringify(result)));
    })
    .catch((err) => {
      reject('updateUserDetail', err.message);
    });
  });
}
