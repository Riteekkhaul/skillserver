const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  companyName:{
    type: String,
    required: true
  },
  contact :{
    type: String,
    required: true
  }
});

module.exports = mongoose.model("company", CompanySchema);
