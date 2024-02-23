// models/User.js
let users = {}; // Basit bir örnek olarak, kullanıcıları bir objede saklayacağız

module.exports = {
  get users() {
    return users;
  },
  get usersLength() {
    return users.length;
  },
  set users(newUsers) {
    users = newUsers;
  },
  addUser(username, userData) {
    users[username] = userData;
  },
  getUser(username) {
    return users[username];
  },
};
