const express = require('express');
const request=require('request');
var crypto = require('crypto');
const router = express.Router();
const fetch = require('node-fetch');
const {signup,getuser,userById,assigntoaccount,getAccountById,getaccountList,transaction,getAccountSumry}=require('../controllers/user');
const {createaccounttype,getAccountType}=require('../controllers/accountType');

//randomValueBase64
function randomValueBase64() {
  return Math.random().toString().substring(2, 15);
}

//add account type
router.get('/getaccounttype',getAccountType);
router.get('/getAccountById/:userid',getAccountById);
router.post('/add-account-type',createaccounttype);
router.post('/assigntoaccount',assigntoaccount);
router.post('/transaction',transaction);
router.get('/getuser',getuser);
async function getapi(url) { 
    // Storing response 
    const response = await fetch(url); 
    // Storing data in form of JSON 
    var data = await response.json(); 
    console.log(data);
    
}
router.get('/get-accountsumry/:accountnum',getAccountSumry);

//view-account
router.get('/view-account/:accountnumber', async function(req,res){
  const response = await fetch('http://localhost:8000/getaccountList'); 
  var data = await response.json(); 
    console.log(data);
    var title={title:"Fund Transfer",fromAccount:req.params.accountnumber,accountlis:data};
    ///console.log(randomValueBase64());
    res.render('view-account',title);
})

router.get('/user-detail/:id',async function(req,res){
  ///console.log(req.params.id);
  const response = await fetch('http://localhost:8000/userbyid/'+req.params.id); 
    var data = await response.json(); 
    ///console.log(data);
  var title={title:"User Detail",getdata:data,account_number:randomValueBase64()};
  ///console.log(randomValueBase64());
  res.render('user-detail',title);
});

router.get('/getaccountList',getaccountList);

router.get('/fund-transfer',async function(req,res){
  const response = await fetch('http://localhost:8000/getaccountList'); 
    var data = await response.json(); 
  var viewData={title:"Fund Transfer from one Account to Another",accountlis:data};
  res.render('fund-transfer',viewData);
});

router.get('/',async function(req,res){
    
    ///console.log(getapi('http://localhost:8000/getuser'));
    const response = await fetch('http://localhost:8000/getuser'); 
    var data = await response.json(); 
    var viewData={success:"Hello",getdata:data};
    ///console.log(viewData);
   res.render('index',viewData);
});
router.get('/create-user',function(req,res){
    var title={title:"Create User"};
    res.render('create-user',title);
});

router.get('/userbyid/:id',userById);
router.post('/signup',signup);

router.post('/create-user',function(req,res){
    fetch('http://localhost:8000/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }).then((data)=>{
      if(data.status==400)
      {
        res.render('user-detail/'+req.body.user_id,{error:"Email is taken",name:req.body.name,email:req.body.email});
      }
      ///res.redirect('/');
  }).catch((err)=>{
      console.log(err);
  });
});
module.exports=router;