const express = require('express');
const CertificateModal =require('../modals/CertificateModal');
const router = express.Router();


router.post('/getcert', (req, res) => {
    const { certId } = req.body;
  
    // Check if cert exists in database
    CertificateModal.findOne({_id:certId}, (err, cert) => {
      if (err) return res.status(500).send({message:'Error in getting certi.'});
      if (!cert) return res.status(400).send({message:'Certificate not found'});
  
        // Send certData in response
        res.send({ cert });
      });
    });
  
  module.exports = router;