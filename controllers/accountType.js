const { response } = require('express');
const Accounttype=require('../models/accountType');
exports.getAccountType=(req,res)=>{
    Accounttype.find({}).exec((error, result) => {
        if(error) {
            return res.status(500).send(error);
        }
        res.send(result);
        ///next();
    });   
}
exports.createaccounttype=(req,res)=>{
    ///console.log(req.body);
    const data = new Accounttype(req.body);
    console.log(data);
    data.save((err, data) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Some thing went wrong'
            });
        }
        res.json({
            data
        }); 
    });
}