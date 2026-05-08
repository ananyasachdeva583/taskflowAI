const express = require("express");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

let users = [];

app.post("/register",(req,res)=>{

  const {name,email,password} = req.body;

  users.push({
    name,
    email,
    password
  });

  res.json({
    msg:"Registration Successful"
  });

});

app.post("/login",(req,res)=>{

  const {email,password} = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if(user){

    res.json({
      success:true
    });

  }
  else{

    res.json({
      success:false,
      msg:"Invalid Credentials"
    });

  }

});

app.listen(5000,()=>{

  console.log("Server Running on Port 5000");

});