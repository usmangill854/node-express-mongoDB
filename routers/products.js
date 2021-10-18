const express = require('express')
const mongoose = require("mongoose");
const Products = require("../models/product");
const {Category} = require("../models/category");
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
    destination:function (req,file,cd){
        cb(null,'/public/uploads')
    },
    filename:function (req,file,cb){
        const fileName= file.originalname.split(' ').join('_');
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})
const uploadOptions = multer({storage:storage})


router.get(`/`,async (req,res) =>{
//products?category={[546464,456456]}
    let filter = {}
    if(req.query.categories){
        //puchna hai ye
          filter = { category:req.query.categories.split(',')}
    }
    console.log(filter)
    const productList =  await  Products.find(filter).populate('category');
        // .select('name  image  ')
    if(!productList){
        res.status(500).json({success:false})
    }

    res.send(productList)
    console.log(productList)
})
router.put('/:id',uploadOptions.single('image'),async(req,res) =>{

    const fileName = req.file.filename
    const basePath =`${req.protocol}://${req.get('host')}/public/upload/`
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).json({message: 'Invalid Id'})
    }
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).json({message: 'Invalid Category'})

    const product = await Products.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: `${basePath}${fileName}`,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
    },{new:true}
    )
    if(!product){
        res.status(500).send('product cannot be updated')
    }
    res.send(product)

})

router.get('/:id', async (req,res) =>{
    const product = await Products.findById(req.params.id).populate('category')
    if(!product){
        res.status(404).json({success:false,message:'product not found'})
    }
    else
        res.send(product)
})

router.delete('/:id',async (req,res) => {

    const product = await Products.findByIdAndRemove(req.params.id)
    if(!product){
        res.status(505).json({success:false,message:'not deleted id is not valid'})
    }
    else res.status(200).json({success:true,message:'deleted successfully'})
} )

router.get('/get/count',async (req,res) =>{
    const productCount =await Products.countDocuments()
    if(!productCount) {
        res.status(500).json({success: false})
    }
     else res.send({productCount:productCount})
})


router.get('/get/featured/:count',async (req,res) =>{
    const count = req.params.count?req.params.count : 0
    const products =await Products.find({isFeatured:true}).limit(+count)
    if(!products) {
        res.status(500).json({success: false})
    }
    else res.send({products:products})
})




router.post(`/`,async(req,res) => {
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('invalid Category')
    const product= new Products ({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    })
    const postProduct =await product.save()
    console.log(postProduct)
    if(!postProduct){
        res.status(500).json({success: false,message:'product cannot created'})
    }
    else{
        res.status(200).json(postProduct)
    }
    // product.save().then((createdProduct => {
    //     res.status(201).json(createdProduct)
    // })).catch((err) => {
    //     res.status(500).json({
    //         error:err,
    //         success:false
    //     })
    // })
    // product.save().then((createdProduct => {
    //     res.status(201).json(createdProduct)
    // })).catch((err) => {
    //     res.status(500).json({
    //         error:err
    //     })
    // })
    // product.save((err,result) => {
    //     if(err){
    //        res.status(505).json()
    //     }
    //     else{
    //         console.log(`result is ${result}`)
    //     }
    // })
    // console.log(req.body.name)
    // console.log(newProduct)
    // res.send(product)

})
module.exports = router;