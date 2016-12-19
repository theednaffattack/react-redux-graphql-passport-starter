import bcrypt from 'bcrypt-nodejs';
import { find } from 'lodash';

export default class FakeUserStore {

  // TODO: use async api for bcrypt
  // https://github.com/kelektiv/node.bcrypt.js#api

  constructor() {
    this.users = [
      { username: 'user1', hashedPassword: generateHash('pass1'), id: 0 },
      { username: 'user2', hashedPassword: generateHash('pass2'), id: 1 },
    ];
  }

  userExists(username) {
    return (find(this.users, { username }) !== undefined);
  }

  getUser(username) {
    return find(this.users, { username });
  }

  addUser(username, password) {
    if (this.userExists(username)) {
      throw new Error('user already exists');
    }

    const newUser = {
      username,
      hashedPassword: generateHash(password),
      id: this.users.length + 1,
    };

    this.users.push(newUser);

    return newUser;
  }

  /**
   * @param {string} username
   * @param {string} password
   *
   * @return {boolean}
   */
  validateUser(username, password) {
    if (!this.userExists(username)) {
      throw new Error('user does not exist');
    }

    const user = this.getUser(username);

    const passMatches = bcrypt.compareSync(password, user.hashedPassword);

    return passMatches;
  }

}

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}
