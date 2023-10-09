const bcrypt = require('bcrypt');

const users = [{ username: 'user123', password: bcrypt.hashSync('user123', 10) }];

class UserModel {
  static async findByUsername(username) {
    return users.find((user) => user.username === username);
  }

  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    return { username };
  }
}

module.exports = UserModel;
