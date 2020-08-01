const mongoose = require('mongoose');

const dbName = process.env.dbName || 'speedwagon';
const connectionString = `mongodb+srv://scraper:244466666@cluster0.0bilv.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(
  process.env.MONGO_URI || connectionString,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true }
)

module.exports = mongoose