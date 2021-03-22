const { response } = require('express');
var ObjectId = require('mongodb').ObjectId; 
const User = require('../models/user');
const Useraccount=require('../models/userAccount');
const Transaction=require('../models/transaction');
// using promise
exports.getuser=(req,response)=>{
    User.find({}).exec((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
        ///next();
    });
};

exports.getAccountById=(req,res)=>{
    let user_id=req.params.userid;
    Useraccount.find({"user_id": ObjectId(user_id)}).then(data=> {
        res.json(data);
    });  
}

exports.getaccountList=(req,res)=>{
    Useraccount.find({}).exec((err,data)=>{
        if(!data)
        {
            return res.json({
                error: 'Recond Not Found'
            });
        }
        res.json(data);
    })
}

exports.assigntoaccount=(req,res)=>{
    const {account_number,user_id,account_type} =req.body;
    req.body.account_number=Math.random().toString().substring(2, 15);
    req.body.balance_amount=50000;
    const account = new Useraccount(req.body);
    console.log(account);
    Useraccount.findOne({"user_id": ObjectId(user_id),"account_type":account_type}).then(data=> {
        ///console.log(data);
        if (data) {
            return res.json({status:400,message:"Account Already Exists"});
        }else
        {
            account.save((err, account) => {
                console.log(err);
                if (err) {
                    return res.status(400).json({
                        // error: errorHandler(err)
                        error: 'Account Already Exists'
                    });
                }
                res.json({status:200,message:"Account assigned successfully"});
            });
        }
      });
}

exports.userById=(req,res)=>{
    var hex = /[0-9A-Fa-f]{6}/g;
    let id=(hex.test(req.params.id))? ObjectId(req.params.id) : req.params.id;
    ///console.log(id);
    User.findOne({"_id": id}).exec((err,data)=>{
        if(!data)
        {
            return res.json({
                error: 'Data not found'
            });
        }
        res.json(data);
    })
}
//transaction
exports.transaction = (req, res) => {
    // console.log("req.body", req.body);
    Useraccount.findOne({"account_number":req.body.from_account}).exec((err,data)=>{
        req.body.user_id=data.user_id;
        const tsdata = new Transaction(req.body);
        if(data.balance_amount>req.body.amount)
        {
            var updateFromBalance=parseInt(data.balance_amount-req.body.amount);
            tsdata.save((err, data) => {
                if (err) {
                    return res.status(400).json({
                        // error: errorHandler(err)
                        error: 'Email is taken'
                    });
                }
                Useraccount.update({account_number:req.body.from_account}, {$set:{balance_amount:updateFromBalance}}, function(err, result) {
                    if ( err ) throw err;
                });
                Useraccount.findOne({"account_number":req.body.to_account}).exec((err,data)=>{
                   var updateToBalance=parseInt(parseInt(data.balance_amount)+parseInt(req.body.amount));
                   Useraccount.update({account_number:req.body.to_account}, {$set:{balance_amount:updateToBalance}}, function(err, result) {
                    if ( err ) throw err;
                   });  

                });
                res.json({status:200,data:data});
            });
        }else
        {
            res.json({status:100,message:"You have not enough balance to transfer"});
        }
        
    });
};

exports.getAccountSumry=(req,res)=>{
    let account_number=req.params.accountnum;
    console.log(account_number);
    Useraccount.findOne({"account_number":account_number}).exec((err,data)=>{
        if(!data)
        {
            return res.json({
                error: 'Data not found'
            }); 
        }
        res.json(data);  
    });
}

// create user
exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }
        res.json({
            user
        });
    });
};