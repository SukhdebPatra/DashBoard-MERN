
const express = require('express')
const cors = require("cors")
//const mongoose=require('mongoose')
require('./db/config');
const users = require('./db/users')

const Jwt = require('jsonwebtoken')
const jwtKey = 'e-comm';


const app = express();

const Product = require('./db/Product');



app.use(express.json());
app.use(cors());


// Register api
app.post('/register', async (req, res) => {
    let user = new users(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, (err, token) => {
        if (err) {
            res.send({ result: 'somthing went wrong' })
        }
        res.send({result, auth: token })
    })
})

    


 

// Log In Api

app.post('/login',async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await users.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, (err, token) => {
                if (err) {
                    res.send({ result: 'somthing went wrong' })
                }
                res.send({user, auth: token })
            })


        } else {
            res.send({ result: 'no user found' })
        }
    }
    else {
        res.send({ result: 'no user found' })
    }

})
/*
const connectDB=async()=>{
    mongoose.connect('mongodb://localhost:27017/mernproject');
    const productSchema=new mongoose.Schema({});

    const product=mongoose.model('product',productSchema)
    const data=await product.find();
    console.warn(data);

}
connectDB();
app.get('/',(req,res)=>{
    res.send('app is working')
})*/


// Add product Api

app.post("/add-product",async (req, res) => {
    let product = new Product(req.body)
    let result = await product.save();
    res.send(result)
})

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products)
    }
    else {
        res.send({ result: "NO Products found" })
    }

})
// Delete  Api
app.delete("/product/:id", async (req, res) => {

    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result);
})

//Update Api

app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: 'No Record Found' })
    }
});
app.put('/product/:id',async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        })
    res.send(result)
});

//search Api

app.get("/search/:key",varifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } }
        ]
    });
    res.send(result)
})

  function varifyToken(req,res,next){
      const token=req.headers['authroization'];
      if(token){
          token=token.split('')[1];
          console.log('middle ware',token);
          Jwt.verify(token,jwtKey,(err,valid)=>{
              if(err){
                  res.send({result:"please add a token"})

              }
              else{
                next();
              }
          })
      }else{

          res.send('please add token with header')

      }
      
    
  }


app.listen(5000);