import express from 'express'
import Product from '../models/product.js';

const productRouter= express.Router();

productRouter.get('/filter', async (req,res)=> {
    try{
        const limit = parseInt(req.query.limit) || 5;
        const page = parseInt(req.query.page) || 1;
        const month = parseInt(req.query.month) + 1 || 3; 
        const search = req.query.search || "";
        const skipDocs = (page - 1) * limit;
        const totalDocs = skipDocs + limit;
        
        const products = await Product.find({
            $and: [
                {
                    $expr: {
                        $eq: [
                            { $month: { $toDate: '$dateOfSale' } },
                            month
                        ]
                    }
                },
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
            
                    ]
                }
            ]
        }).limit(totalDocs).skip(skipDocs).collation({ locale: 'en', strength: 2 });

        const totalItems= await Product.countDocuments({
            $and: [
                {
                    $expr: {
                        $eq: [
                            { $month: { $toDate: '$dateOfSale' } },
                            month
                        ]
                    }
                },
                {
                    $or: [
                        { title: { $regex: search, $options: 'i' } },
                        { description: { $regex: search, $options: 'i' } },
            
                    ]
                }
            ]
    });
        
        res.json({products, totalItems});
        
    }catch(err){
        res.status(403).json({message:err})
    }
})

productRouter.get('/:userId', async (req,res)=> {
    const month= +req.params.userId
    const pro= await Product.find({
        $expr: {
            $eq: [
                {$month: {
                    $toDate: '$dateOfSale'
                }},month
            ]
        }
    });
    res.json(pro)
});

export default productRouter;