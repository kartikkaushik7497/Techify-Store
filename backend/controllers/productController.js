const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");


//Route Check!!
exports.routeCheck = catchAsyncErrors(async(req,res)=>{
    
    res.status(200).json({message:"Route is working fine!"});
});

//Create product --Admin
exports.createProduct = catchAsyncErrors(async (req,res,next)=>{

    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get All Products --Admin
exports.getAllProducts = catchAsyncErrors(async(req,res)=>{
    // const products = await Product.find();

    //Taking .query from  **this.query = this.query.find({ ...keyword });** 
    //And Search
    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query; //Inside products are all searched results

    res.status(200).json({
        success:true,
        products
    });
})

//Get Product Details --Admin
exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);
 
    if(!product){
        return next(new ErrorHandler("Product not found",404)); //Next is callback Function
    }

    res.status(200).json({
        success:true,
        product,
        productCount
    });
});

//Update Product --Admin
exports.updateProduct = catchAsyncErrors(async(req,res,next)=>{

    let product = await Product.findById(req.params.id); //Let because of changing values

    if(!product){
        return next(new ErrorHandler("Product not found",404)); //Next is callback Function
    }

    //Store All the Updated values using id & body(names,titles) into the product
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

    res.status(200).json({
        success:true,
        product
    });
})


//Delete Product --Admin
exports.deleteProduct = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404)); //Next is callback Function
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });
});
