var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://root:root@ds111103.mlab.com:11103/meantodosapp',['todos'])


//Get all todos
router.get('/todos',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed


    db.todos.find(function(err,todos){
        if(err){
            res.err(err);
        } else {
            res.json(todos);
        }

    });
});

//Get single todo
router.get('/todo/:id', function(req,res,next){
        res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err,todo){
        if(err){
            res.send(err);
        } else {
            res.json(todo);
        }
    });
});


//Save todo
router.post('/todo',function(req,res,next){

    req.setHeader('Access-Control-Allow-Origin', '*');
    req.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    req.setHeader('Access-Control-Allow-Headers', '*'); // If needed
    req.setHeader('Access-Control-Allow-Credentials', true); // If needed
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', '*'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed

    var todo = req.body;
    var updObj = {};

    if(todo.isCompleted){
        updObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updObj.text = todo.text;
    }

    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({"error":"Invalid data"});
    } else {
        db.todo.save(todo,function(err,result){
            if(err){
                res.send(err);
            } else {
                res.json(result);
            }
        }); 
    }
});


//Delete todo
router.delete('/todo/:id', function(req,res,next){

        res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,contenttype'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed
    db.todo.remove({
        _id : mongojs.ObjectId(req.params.id)
    }),'',function(err,result){
        if(err){
            res.send(err);
        } else {
            res.json(result);
        }
    }
});

module.exports = router;