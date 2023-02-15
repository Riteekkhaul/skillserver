const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CertificateSchema = new Schema({
  candidateName: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  companyName:{
    type: String,
    required: true
  },
  course :{
    type: String,
    required: true
  },
  duration :{
    type: String,
    required: true
  },
  date :{
    type: Date,
    required: true
  },
  cert_txn :{
    type: String,
   
  },
});

module.exports = mongoose.model("certificate", CertificateSchema);
