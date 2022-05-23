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
        } 
    },

    {
        collection: 'items'
    }

)

module.exports = mongoose.model("Item", Item)