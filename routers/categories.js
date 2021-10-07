const {Category} = require('../models/category')
const express = require('express')
const mongoose = require("mongoose");
const router = express.Router()

router.get('/',async (req,res) => {
    const categoryList = await Category.find()
    if(!categoryList){
        res.status(500).json({success:false})
    }
    res.status(200).send(categoryList)
})

router.get('/:id',async (req,res) =>{
    const category = await Category.findById(req.params.id)
    if(category){
        res.status(200).send(category)
    }
    else
        res.status(500).json({success:false , message : 'Category by given id is not found'})
})
router.put('/:id',async (req,res) =>{
    const category = await Category.findByIdAndUpdate(
        req.params.id,{
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        },{new:true}
    )
    if(category){
        res.send(category)}
    else

        res.status(500).json({success:false,message:'category not updated'})

})


router.post('/',async(req,res) =>{
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color:req.body.color
    })
    category= await category.save()
    console.log(category)
    if(!category){
          res.status(404).send('category cannot created')
    }
    res.send(category)


})

router.delete('/:id',async (req,res) =>{
    const deleteCategory =await  Category.findByIdAndRemove(req.params.id)
    if(!deleteCategory){
        res.status(404).json({success:false,message:'did not found id'})
    }
    else{
        res.status(200).json({success:true ,message:'deleted'})
    }

})
// router.delete('/:id',(req,res) => {
//     Category.findByIdAndRemove(req.params.id).then(category => {
//         if(category){
//             res.status(200).json({success:true,message:'category deleted'})
//         }
//         else if(!category){
//             res.status(404).json({success:false,message: 'category not found'})
//         }
//     })
//         .catch(err=>{
//         res.status(400).json({success:false,error:err})
//     })
// })
module.exports = router