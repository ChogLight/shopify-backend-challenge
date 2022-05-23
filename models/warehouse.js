let mongoose = require('mongoose');
let item = require('./items')
let Warehouse = mongoose.Schema(
    {
        Name:String,
        Items: [item.schema]
    },

    {
        collection: 'warehouses'
    }

)

module.exports = mongoose.model("Warehouse", Warehouse)