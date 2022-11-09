const express=require('express')
const app=express()
const cors=require('cors')
const port=process.env.PORT||5000
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors())
app.use(express.json())

////////////////////////

//fitbazzDBUser
//t5y3yQTfBRgBm8EY
//t5y3yQTfBRgBm8EY

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASS)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g3rb4ny.mongodb.net/?retryWrites=true&w=majority`;

// console.log(uri)


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){

  try{

const serviceCollection=client.db('fitBazz').collection('services')
const addCollection=client.db('fitBazz').collection('add')

app.get('/services',async(req,res)=>{
  const query={}
  const cursor=serviceCollection.find(query)
  const services=await cursor.toArray()
  res.send(services)
  })


//add service api

app.get('/addNewService',async(req,res)=>{

  let query={}

if(req.query.email){

query={

email:req.query.email


}


}



  const cursor= addCollection.find(query)
  const newadd=await cursor.toArray()
  res.send(newadd)
  })








  app.post('/addNewService', async (req, res) => {


    const result = await addCollection.insertOne(req.body);


    res.send(result);
})



  }
finally{






}




}

run().catch(err=>console.error(err))




// ////////////////////
app.get('/',(req,res)=>{

res.send('Fitbazz server running.')

})

app.listen(port,()=>{


console.log(`server running on port: ${port}`)

})