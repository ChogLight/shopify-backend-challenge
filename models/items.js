let mongoose = require('mongoose');

let Item = mongoose.Schema(
    {
        Name:{
            type: String,
            required: 'Name is required'
        },
        Price: {
            type: Number,
            required: 'Price is required'
        },
        Quantity:{
            type:Number
        } ,
        Warehouse:{
            type: String
        }
    },

    {
        collection: 'items'
    }

)

module.exports = mongoose.model("Item", Item)