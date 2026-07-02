const mongoose = require("mongoose");


const orderSchema =
new mongoose.Schema(
{
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  vendorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Vendor",
    required:true
  },

  materials:[
    {
      name:String,

      weight:Number,

      rate:Number
    }
  ],

  contactNo:{
    type:String,
    required:true
  },

  pickupDate: {
  type: Date,
  required: true,
},

pickupTime: {
  type: String,
  required: true,
},

  totalAmount:{
    type:Number,
    default:0
  },

  status:{
    type:String,
    enum:[
      "Pending",
      "Accepted",
      "Rejected",
      "Completed",
      "Cancelled"
    ],
    default:"Pending"
  },

  pickupLocation:{
    latitude:Number,
    longitude:Number
}

},
{
 timestamps:true
});

module.exports = mongoose.model(
 "Order",
 orderSchema
);