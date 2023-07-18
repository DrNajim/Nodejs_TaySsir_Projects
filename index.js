const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const rateLimit = require('express-rate-limit')
const bcrypt = require("bcryptjs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());
require('dotenv').config({path: "./index.env"});
const ContactModel = require("./modals/contact");
const UserModel = require("./modals/users");
const PORT=process.env.PORT;
const URI= process.env.MONGPDB_URI;
app.listen(PORT, () => console.log(`server running on port ${PORT}...`));
mongoose.connect(`${URI}`);
app.use(cors());
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// Apply the rate limiting middleware to all requests
app.use(limiter)

app.post("/Hospitauxpub", async (req, res) => {
    try {
        const collectionName = 'Hospitauxpub';
        const collection = mongoose.connection.db.collection(collectionName);
        let verify = await collection.find().toArray();
        res.send(verify);
      } catch (err) {
        console.log(err);
      }
    });
    app.post("/Signin", async (req,res)=>{
      const users = req.body;
      const password= req.body.password
      try {
      let verify = await UserModel.findOne({
        email: users.email,
      });    

      if (verify) {
        const auth = await bcrypt.compare(password, users.password)
        if (!auth) {
          return res.send({message:'Incorrect password or email' }) 
        }    
        res.send(verify);
      }
       else {
        res.send(verify);
      }
    }
      catch (err) {
        console.log(err);
      }
    });
    app.post("/Signup", async (req, res) => {
      const users = req.body;
      try {
        let verify = await UserModel.findOne({
          email: users.email
        });
        if (verify) {
          console.log("user already exist")
          res.send("user already exist");
        } else {
          const newuser = new UserModel(users);
          let save = await newuser.save();
          if (save) {
            res.send("user inserted");
          } else {
            res.send("not inserted");
          }
        }
      } catch (err) {
        console.log(err);
      }
    });
    app.post("/Contact", async (req, res) => {
      const contact = req.body;
      try {
          const newcontact = new ContactModel(contact);
          let save = await newcontact.save();
          if (save) {
            res.send("newcontact inserted");
          } else {
            res.send("not inserted");
          }
      } catch (err) {
        console.log(err);
      }
    });

