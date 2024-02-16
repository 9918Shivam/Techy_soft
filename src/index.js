const express=require('express');
const path=require('path');
const bcrypt =require('bcrypt');
const collection = require("./config");



const app=express();
app.use(express.json());

app.use(express.urlencoded({extended:false}));


console.log(path.join(__dirname,'../public'));
// console.log(path.join(__dirname,'public'));

const publicPath=path.join(__dirname,'../public');
app.use(express.static(publicPath));

app.get("/",(req,res)=>{
    res.sendFile(`${publicPath}/index.html`);
});


app.get("/signup",(req,res)=>{
    res.sendFile(`${publicPath}/signup.html`);

});

app.get("/login",(req,res)=>{
    res.sendFile(`${publicPath}/login.html`);
});




// register user
app.post("/signup",async(req,res)=>{
    const data={
        name : req.body.username,
        password:req.body.password
    }
 console.log(req.body.username,req.body.password);
 
    const existinguser=await collection.findOne({name:data.name});
    if(existinguser){
        res.send("User already exists.Please choose a different ")
    }else{
        // hashing password
        const saltRounds=10        // number of sait rounds for bcrypt
        const hashedPassword=await bcrypt.hash(data.password,saltRounds);

        data.password=hashedPassword;      //replacing hashed password to original password

        const userdata=await collection.insertMany(data);
    console.log(userdata);
    }
    // res.render("signup");
    res.sendFile(`${publicPath}/signup.html`);
})


//login user
app.post('/login',async(req,res)=>{
    try{
         const check=await collection.findOne({name:req.body.username});
         if(!check){
            res.send("User name can't find.");
         }
            //compairing the hashed password with plain text 
            const isPasswoedMatch =await bcrypt.compare(req.body.password,check.password);
            if(isPasswoedMatch){
                // res.render('index');
                res.sendFile(`${publicPath}/index.html`);
            }else{
                res.send("Wrong password.");
            }
    }catch{
        res.send("Wrong Detail.");

    }
})








app.listen(3000,()=>{
    console.log("listening on port 3000");
});