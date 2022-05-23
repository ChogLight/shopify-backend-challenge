let mongoose = require('mongoose');

let Item = mongoose.Schema(
    {
        Name:String,
        Price: Number,
        Quantity: Number,
        Warehouse: String
    },

    {
        collection: 'items'
    }

)

module.exports = mongoose.model("Item", Item)