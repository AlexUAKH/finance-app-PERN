module.exports = class ProfileDto {
  id;
  name;
  constructor(model) {
    this.id = model._id;
    this.name = model.name;
  }
};
