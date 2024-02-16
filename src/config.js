const mongoose= require("mongoose");

const connect = mongoose.connect("mongodb://0.0.0.0/Login-tut");

connect.then(()=>{
    console.log("Database connected successfully");
})
.catch(()=>{
    console.log("Database can't be connected");
}); 


//create a schema
const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
});

// Collection part
const collection = new mongoose.model("finals",LoginSchema);

module.exports = collection;



// Instead of writing _________   mongodb://localhost:27017/Login-tut   _____  to connect to mongodb database
// use this::   mongodb://0.0.0.0/Login-tut");