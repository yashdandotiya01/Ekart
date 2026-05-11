import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title:{
      type:String,
      required:true,
    },

    description:{
      type:String,
      required:true,
    },

    price:{
      type:Number,
      required:true,
    },

    image:{
      type:String,
      required:true,
    },

    category:{
      type:String,
      required:true,
    },

    brand:{
      type:String,
      default:"EKART",
    },

    rating:{
      type:Number,
      default:4,
    },

    stock:{
      type:Number,
      default:1,
    },

    featured:{
      type:Boolean,
      default:false,
    },
  },
  {timestamps:true}
);

const Product = mongoose.model("Product",productSchema);

export default Product;