const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    vendorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    unique:true
  },

  username:{
    type:String,
    unique:true,
    required:true
  },

     shopNameEnglish: {
      type: String,
      required: true
    },
    shopNameHindi: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },
    
    openingTime: {
      type: String,
      required: true
    },
    closingTime: {
      type: String,
      required: true
    },
    materials:[
    {
      name:String,
      rate:Number
    }
  ],
  shopLocation:{
    latitude:{
        type:Number,
        default:null
    },
    longitude:{
        type:Number,
        default:null
    },
    updatedAt:Date
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Vendor",
  vendorSchema
);