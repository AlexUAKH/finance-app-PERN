module.exports = class RecordsDto {
  id;
  description;
  type;
  date;
  uah;
  usd;
  euro;
  createdAt;
  userId;
  userName;
  constructor(model) {
    this.id = model.id;
    this.description = model.description;
    this.type = model.type;
    this.date = model.date;
    this.uah = model.uah;
    this.usd = model.usd;
    this.euro = model.euro;
    this.createdAt = model.createdAt;
    this.userId = model.userId;
    this.userName = model.userName;
  }
};
