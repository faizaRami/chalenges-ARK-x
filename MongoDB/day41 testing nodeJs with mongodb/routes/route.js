const express=require("express")
const route= express.Router()
const products= require("../models/products")
const {run}=require('../db')


route.get("/", async (req,res)=>{
      try {
            const db = await run();
            const phones = await db.collection("phones").find().toArray();
            res.send(phones); // Send the response here
          } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
          }
})


route.post("/", async (req, res) => {
      try {
        const { name, description, price, image } = req.body;
        const db = await run();
    
        const newProduct = {
          name,
          description,
          price,
          image
        };
    
        // Insert the new product into the database
        const result = await db.collection("phones").insertOne(newProduct);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    
        // Send the response after the database operation is complete
        res.status(201).json(newProduct);
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
      }
    });
    

route.put("/:id",(req,res)=>{
      const {id} = req.params
      const {name, price} = req.body

      const productIndex = products.findIndex((product)=>product.id===parseInt(id))
      
      const updateProduct= {
            ...products[productIndex],
            name:name,
            price:price
      }
      console.log(updateProduct)
      products[productIndex] = updateProduct;

      res.json(updateProduct)
})

route.delete("/",async (req,res)=>{


      const db= await run()

      const phones = await db.collection("phones").deleteMany()
      console.log(phones);
      res.send(phones)

      }
)
route.delete("/:name",async (req,res)=>{

      const {name} = req.params
      const db= await run()
      const Product= {
            name:name,
            
      }
      const phone = await db.collection("phones").deleteOne(Product)
    
      res.send(phone)

      }
)
module.exports = route