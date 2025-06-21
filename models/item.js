import mongoose from "mongoose"

const itemSchema = mongoose.Schema({
    itemId : {
        type: String,
        required: true,
        unique: true
    },
    itemName : {
        type: String,
        required: true
    },
    altName : [
        {
            type : String
        }
    ],
    images : [
        {
            type: String
        }
    ],
    price : {
        type: Number,
        required: true
    },
    lastPrice : {
        type : Number,
        required: true
    },
    stock : {
        type: Number,
        required : true
    },
    description :
    {
        type: String,
        required: true
    }
})

const Item = mongoose.model("items",itemSchema)

export default Item