import Product from "../models/Product.js";
import cloudinary
from "../config/cloudinary.js";


// CREATE PRODUCT
export const createProduct =
async(req,res)=>{

    try {

        const {

            title,

            description,

            price,

            category

        } = req.body;

        // UPLOAD IMAGE
        const result =
        await cloudinary.uploader.upload(

            req.file.path,

            {
                folder:"ekart-products",
            }
        );

        // CREATE PRODUCT
        const product =
        await Product.create({

            title,

            description,

            price,

            category,

            image:result.secure_url,
        });

        res.status(201).json({

            success:true,

            product,
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};

export const updateProduct =
async(req,res)=>{

    try {

        const product =
        await Product.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new:true,
            }
        );

        res.status(200).json({

            success:true,

            product,
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};

export const deleteProduct =
async(req,res)=>{

    try {

        await Product.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({

            success:true,

            message:"Product Deleted",
        });

    } catch (error) {

        res.status(500).json({

            success:false,

            message:error.message,
        });
    }
};

// GET ALL PRODUCTS
export const getProducts = async(req,res)=>{
  try {

    const products = await Product.find();

    res.status(200).json({
      success:true,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};


// GET SINGLE PRODUCT
export const getSingleProduct = async(req,res)=>{
  try {

    const product = await Product.findById(req.params.id);

    res.status(200).json({
      success:true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success:false,
      message:error.message,
    });

  }
};