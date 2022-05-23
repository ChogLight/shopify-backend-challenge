var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let warehouses = require('../models/warehouse');
let items = require('../models/items');
/* GET home page. */
router.get('/', function(req, res, next) {
  items.find((err, items) => {
    if(err){
      return console.log(err);
    }
    else{
      res.render('index', { 
        title: 'Home',
        items: items 
      });
    }
  })
 
});
/*GET add page*/
router.get('/add', function(req, res, next){
  res.render('add', {
    title: 'Add new Item'
  })
})

router.post('/add', function(req,res,next){
  let newItem = new items({
      Name: req.body.itemName,
      Price: req.body.itemPrice
  })
  items.create(newItem, (err, item) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/')
    }
  })
})

module.exports = router;
