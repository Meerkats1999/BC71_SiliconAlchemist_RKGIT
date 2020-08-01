const mongoose = require('mongoose');
const db = require('../config/db');

const postSchema = mongoose.Schema({
  lat: {
    type: String,
    required: true
  },
  lon:{
    type:String,
    default: ''
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  contentURL: {
    type: String,
    required:true
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  description: {
    type: String,
  },
});

const Model = db.model('Feedback', postSchema);

async function get(_id) {
  const model = await Model.findOne(
    {_id},
    {__v: 0}
  );
  return model;
}

async function list() {
  return await Model.find({}).sort({createdOn:-1});
}

async function create(fields) {
  const model = new Model(fields);
  await model.save();
  return await get(model._id);
}
module.exports = {
  get,
  list,
  create,
  model: Model
}