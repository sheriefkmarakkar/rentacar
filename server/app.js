var express = require('express');
var body = require('body-parser');
var app = express();
const path = require('path');
var multer = require('multer');
var mongo = require('mongoose');
var url = "mongodb+srv://footweras:sheriefkm@cluster0-ppyuf.mongodb.net/rcar?retryWrites=true"

var storage =   multer.diskStorage({  
  destination: (req, file, callback)=>{  
    callback(null, './public/images');  
  },  
  filename: (req, file, callback)=>{  
    callback(null, file.originalname);  
  }  
});  
var upload = multer({ storage : storage}).single('image');

mongo.connect(url,{useNewUrlParser:true}, (err)=>{
  if(err) throw err;
  else console.log("Database connected");
})

var user = require('./model/carusers');
var car = require('./model/car');
var book = require('./model/book');

app.use(express.static(path.join(__dirname+"/public"))); 
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.post("/getlogin",(req,res)=>{
 
  user.find({email:req.body.uname,pass:req.body.pass},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
  })
})

app.get("/getcars",(req,res)=>{
 
  car.find({},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
function login()
{
  if(req.body.user)
  {
    return next()
  }
  else
  {
    return res.status(401).json({status: 'Please log in'});
  }
}

app.post("/postbook", (req,res)=>{
  console.log(req.body)
  var b1 = new book(req.body);
  b1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
})

app.post("/getuser",(req,res)=>{
  user.find({_id:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.post("/getbooks",(req,res)=>{
 console.log(req.body.number)
  book.find({num:req.body.number},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})

app.post("/getsinglecar",(req,res)=>{
  alert(req.body.number)
  console.log(req.body.number)
   car.find({num:req.body.number},(err,result)=>{
     if (err)
     {
  
       throw err;
     }
     else res.send(result);
     console.log(result)
   })
 })

app.post("/postdata", (req,res)=>{
  console.log(req.body)
  var u1 = new user(req.body);
  //u1.phn=req.body.phn;
  //u1.role=req.body.role;
  u1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
})
app.post("/cardata",upload ,(req,res)=>{
  console.log(req.body)
 if(req.body.cname !=undefined)
 {
  var c1 = new car(req.body);
  c1.save((err)=>{
    if (err) throw err;
    else res.send({msg:"data added"})
  })
 }
})
app.post("/deleteb",function(req,res){
  console.log(req.body)
  book.deleteOne({_id:req.body.uid},function(err,result){
      if (err) throw err;
      else
      {
        res.send({msg:"data added"})
       
      }
  })
})
app.post("/getmybooks", (req,res)=>{
  console.log(req.body)
  book.find({id:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.post("/getall", (req,res)=>{
  console.log(req.body)
  book.find({__v:req.body.uid},(err,result)=>{
    if (err)
    {
 
      throw err;
    }
    else res.send(result);
    console.log(result)
  })
})
app.get("/added",function(req,res){
  console.log("Data Added")
  res.send("Data Added")
})

app.post("/upuser", (req,res)=>{
  user.updateOne({_id:req.body.uid} ,{$set:{
    name:req.body.name,
    email : req.body.email,
    phn : req.body.phn,
 
    pass:req.body.pass
}}, function(err,result){
  if (err) throw err;
  else{
    
  console.log(req.body)
   res.send({msg:"data added"})
  }
  })
})
app.post("/uprent", (req,res)=>{
  book.updateOne({_id:req.body.uid} ,{$set:{
    __v:1
 
    
}}, function(err,result){
  if (err) throw err;
  else{
    
  console.log(req.body)
   res.send({msg:"data added"})
  }
  })
})

app.listen(8080,()=>{
  console.log("Listening");
})

