const {userRepository} = require('../repositories');

module.exports = {
  create(args) {
    return userRepository.create(args);
  },

  update(id, args) {
    return userRepository.update(id, args);
  },

  delete(id) {
    return userRepository.delete(id);
  },

  get(id) {
    return userRepository.find(id);
  },

  simpleGet(id) {
    const attributes = ['id', 'name', 'role', 'imageUrl'];
    return userRepository.attributesFind(id, attributes);
  },

  getByEmail(email) {
    return userRepository.findByEmail(email);
  },
};
