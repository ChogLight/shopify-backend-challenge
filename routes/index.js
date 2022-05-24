var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let warehouses = require('../models/warehouse');
let items = require('../models/items');
const { findById } = require('../models/items');
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

/*POST add page */
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

/*GET delete item */
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  items.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/");
    }
  });
});

/*GET add warehouse */
router.get('/addWarehouse', function(req, res, next){
  res.render('addWarehouse', {
    title: 'Add new Warehouse'
  })
})

/*POST add warehouse */
router.post('/addWarehouse', function(req,res,next){
  let newWarehouse = new warehouses({
      Name: req.body.warehouseName,
  })
  warehouses.create(newWarehouse, (err, item) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else{
      res.redirect('/')
    }
  })
})
/*GET warehouse list */
router.get('/warehouseList', function(req, res, next){
  warehouses.find((err, warehouses) => {
    if(err){
      return console.log(err);
    }
    else{
      res.render('warehouse', { 
        title: 'Home',
        warehouses: warehouses
      });
    }
  })
})

/*GET warehouse item list*/
router.get('/check/:id', function(req, res, next){
  items.find((err, items) => {
    if(err){
      return console.log(err);
    }
    else{
      warehouses.find((err,warehouses) => {
        if(err){
          return console.log(err);
        }
        else{
          res.render('addItemWarehouse', { 
            title: 'Add Item',
            items: items,
            warehouses:warehouses,
            warehouseId: req.params.id
          });
        }
      })
    }
  })
})

/*POST warehouse add item*/
router.post('/check/:id', function(req,res,next){
 (async () => {
  let itemId = req.body.itemId
  let warehouseId = req.params.id
  let quantity = req.body.itemQuantity
  let item = await items.findById(itemId).exec()
  console.log(item)
  let editeditem = items({
    _id:itemId,
    Quantity:quantity
  });
  let editedWarehouse = {
    $push: {
      "Items": {
        _id: itemId,
        Name: item.Name,
        Price: item.Price,
        Quantity: quantity
      }
    }
  }

  items.updateOne({_id:itemId},editeditem,(err)=>{
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      warehouses.updateOne({_id:warehouseId},editedWarehouse,(err)=>{
        if (err) {
          return console.log(err);
        } else {
          res.redirect('/warehouseList');
        }
      })
    }
  })
 })()
  
 
})

/*GET edit item page */
router.get('/edit/:id', function(req, res, next){
  items.findById(req.params.id,(err, item) => {
    if(err){
      return console.log(err);
    }
    else{
      res.render('editItem', { 
        title: 'Edit Item',
        itemName: item.Name,
        itemPrice: item.Price
      });
    }
  })
})
/*POST edit item page */
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;
  let editeditem = items({
    _id:id,
    Name: req.body.itemName,
    Price: req.body.itemPrice
  });
  items.updateOne({ _id: id }, editeditem, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/');
    }
  });
});


module.exports = router;
