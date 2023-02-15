const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const secret="jfhdhegtuiheiu";

// Load the Admin Mongoose Model
const AdminModal = require('../modals/AdminModal');
const CompanyModal =require('../modals/CompanyModal');

// Route to handle signup
router.post('/signup', async (req, res) => {
  try {
    // Check if the admin already exists
    const existingAdmin = await AdminModal.findOne({ username: req.body.username });
    if (existingAdmin) {
      return res.status(400).send({ error: 'Admin already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create a new admin
    const admin = new AdminModal({
      username: req.body.username,
      password: hash
    });

    // Save the admin to the database
    await admin.save();

    // Return a success message
    res.send({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// POST route for admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if email exists in database
  AdminModal.findOne({ username }, (err, admin) => {
    if (err) return res.status(500).send('Error logging in');
    if (!admin) return res.status(400).send('User not found');

    // Compare the passwords
    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) return res.status(500).send('Error logging in');
      if (!isMatch) return res.status(400).send('Invalid password');

      // Create JWT Token
      const token = jwt.sign({admin}, secret, {
        algorithm: "HS256"
      });

      // Send JWT Token in response
      res.send({ token });
    });
  });
});


// register company 

router.post('/register_company', async (req, res) => {
  try {
    // Check if the company already exists
   
    const existingAdmin = await CompanyModal.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).send({ error: 'company already registered' });
    }

     // Hash the password
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(req.body.password, salt);

    // Create a new compamy
    const company = new CompanyModal({
      companyName: req.body.companyName,
      email: req.body.email,
      password:hash,
      contact:req.body.contact
    });

    // Save the admin to the database
    await company.save();

    // Return a success message
    res.send({ message: 'company registered successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.get('/getAllCompanies', (req, res) => {

  // get all registered companies
  CompanyModal.find({}, (err, companies) => {
    if (err) return res.status(500).send('Error in getting registered companies.');
    if (!companies) return res.status(400).send('No company registered yet!');

      // Send certData in response
      res.send({ companies });
    });
  });

  router.delete("/:id", async (req, res) => {
    try {
      const deletedCompany = await CompanyModal.findByIdAndDelete(req.params.id);
      if (!deletedCompany) {
        return res.status(404).send("Company not found");
      }
      res.send("Company deleted successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

module.exports = router;
