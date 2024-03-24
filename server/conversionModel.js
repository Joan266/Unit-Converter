const mongoose = require('mongoose');

const Schema = mongoose.Schema

const conversionSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    initialNumber: {
      type:String,
      required:true,
    },
    finalNumber: {
      type:String,
      required:true,
    },
    initialUnit: {
      type:String,
      required:true,
    },
    finalUnit: {
      type:String,
      required:true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('Conversion', conversionSchema);