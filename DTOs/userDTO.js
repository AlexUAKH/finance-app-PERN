module.exports = class UserDto {
  email;
  id;
  name;
  createdAt;
  isMailConfermed;
  // updatedAt;
  constructor(model) {
    this.email = model.email;
    this.id = model.id;
    this.name = model.name;
    this.isMailConfermed = model.isMailConfermed;
    this.createdAt = model.createdAt;
    // this.updatedAt = model.updatedAt;
  }
};
