const expressAsyncHandler = require('express-async-handler');
const generateToken = require('../Config/generateToken.js');
const User = require('../model/userModel.js');
const { ObjectId } = require('mongodb');

function isEmptyList(obj){
    return(!obj || obj.length == 0 || Object.keys(obj).length == 0);
}

function handleError(res,error){
    res.status(200);
    res.send(error);
}

//uri1: /api/users/register
//uri2: /api/providers/id

module.exports.login = function(req,res){
    
    try{

        User.find({'name':(req.body.name)})
            .then( result => {
                res.status(200);
                res.json({
                    _id: result[0]._id,
                    name: result[0].name,
                    email: result[0].email,
                    password: result[0].password,
                    isAdmin: result[0].isAdmin,
                    token: generateToken(result[0]._id)
                })
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.register = function(req,res){
    
    try{
        var user = req.body;

        User.create(user)
            .then( result => {
                res.status(201);
                res.json({
                    _id: result._id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
                    isAdmin: result.isAdmin,
                    token: generateToken(result._id)
                })
            })
            .catch(error => handleError(res,error))
    }
    catch(e){
        handleError(res,e)
    }
}

module.exports.fetchAllUsers = expressAsyncHandler(async (req,res)=>{
    const keyword = req.query.search
        ?{
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } }
            ]
        }
        : {};
    
        const users = await User.find(keyword).find({
            _id: { $ne: req.user._id },
        });
        res.send(users);
});

// module.exports.readAll = function(req,res){

//     try{
//         Provider.find()
//             .then( result => {
//                 if(isEmptyList(result)){
//                     res.status(400);
//                     res.send("List is Empty.");
//                 }
//                 res.status(200);
//                 res.send(result);
//             })
//             .catch(error => handleError(res,error));
//     }
//     catch(e){
//         handleError(res,e)
//     }
// }

// module.exports.readOne = function(req,res){
    
//     try{

//         Provider.find({'_id':new ObjectId(req.params.id)})
//             .then( result => {
//                 if(isEmptyList(result)){
//                     res.status(400);
//                     res.send("List is Empty.");
//                 }
//                 res.status(200);
//                 res.send(result);
//             })
//             .catch(error => handleError(res,error))
//     }
//     catch(e){
//         handleError(res,e)
//     }
// }

// module.exports.update = function(req,res){

//     try{
//         let provider = req.body;

//         Provider.findOneAndUpdate({'_id':(req.params.id)}, provider, {new:true})
//             .then( result => {
//                 if(isEmptyList(result)){
//                     res.status(400);
//                     res.send("List is Empty.");
//                 }
        
//                 res.status(200);
//                 res.send("Updated Result "+result);
//             })
//             .catch(error => handleError(res,error))
//     }
//     catch(e){
//         handleError(res,e)
//     }
// }

// module.exports.deleteAll = function(req,res){

//     try{

//         Provider.deleteMany({})
//             .then( result => {
//                 if(result.deletedCount === 0){
//                     res.status(400);
//                     res.send("List is Empty.");
//                 }
        
//                 res.status(200);
//                 res.send("List Deleted \n"+result);
//             })
//             .catch(error => handleError(res,error))

//     }
//     catch(e){
//         handleError(res,e)
//     }
// }

// module.exports.deleteOne = function(req,res){
    
//     try{

//         Provider.findOneAndDelete( {'_id':(req.params.id)})
//             .then( result => {
//                 if(isEmptyList(result)){
//                     res.status(400);
//                     res.send("List is Empty.");
//                 }

//                 res.status(200);
//                 res.send("Deleted Provider "+result);
//             })
//             .catch(error => handleError(res,error))

//     }
//     catch(e){
//         handleError(res,e)
//     }
// }