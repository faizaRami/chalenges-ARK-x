const { MongoClient } = require("mongodb");
const products = require("./models/products")
const uri = "mongodb://127.0.0.1:27017";
const dbName = "products"

const client = new MongoClient(uri)
// console.log(products)
async function run(){
  try{
    // console.log(products);
    await client.connect()
    const db = client.db(dbName)
    const coll = db.collection("phones");
      console.log("connected successfully")
      // await coll.insertMany(products); //it's the way how i store my all data products
    // console.log(phones)
    return db;
  }catch(err){
    console.log(err.message)
  }
}
module.exports = {run}
