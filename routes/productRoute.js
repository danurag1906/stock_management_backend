import express from 'express'
import {Product} from '../models/productModel.js'

const router=express.Router()

//create a new product
router.post('/products',async (req,res)=>{
    try {
        if(
            !req.body.name ||
            !req.body.quantity ||
            !req.body.price
        ){
            return res.status(400).json("all fields are required")
        }

        const newProduct={
            name:req.body.name,
            quantity:req.body.quantity,
            price:req.body.price
        }

        const product=await Product.create(newProduct)

        return res.status(201).json(product)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//get all products
router.get('/products',async(req,res)=>{
    try {
        const products=await Product.find()
        return res.status(200).json({
            count:products.length,
            data:products
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})


//get product by id
router.get('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        return res.status(200).json({product})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//update a book
router.put('/products/:id',async(req,res)=>{
    try {
        if(
            !req.body.name ||
            !req.body.quantity ||
            !req.body.price
        ){
            return res.status(400).json("all fields are required")
        }

        const {id}=req.params

        const result=await Product.findByIdAndUpdate(id,req.body)

        if(!result){
            return res.status(404).json('product not found')
        }

        return res.status(200).json(req.body)

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//delete a book
router.delete("/products/:id",async(req,res)=>{
    try {
        const {id}=req.params
        const result=await Product.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json("product not found")
        }

        return res.status(200).json("product deleted sucessfully")

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})


export default router