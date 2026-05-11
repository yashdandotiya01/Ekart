import express from "express";

import {

   createProduct,

   getProducts,

   getSingleProduct,

   deleteProduct,

   updateProduct

} from "../controllers/productController.js";
import upload
from "../config/multer.js";

const router = express.Router();

router.post(

   "/",

   upload.single("image"),

   createProduct
);

router.get("/",getProducts);

router.get("/:id",getSingleProduct);
router.put(
   "/:id",
   updateProduct
);

export default router;