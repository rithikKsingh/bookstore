import  express  from "express";
import { port,url } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import booksRoute from "./routes/booksRoute.js";

const app=express();

 
//if you get interval server error, one of the reasons might that you are not using 
//express.json() middleware
app.use(express.json());


//middleware for handling cors policy
//op 1: allow all origins with default of cors(*)
app.use(cors());
// //op 2:allow custom origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type']
//     })
// )

//write all these in seperate route folder as we can have more than one models and use express router
app.get('/',(req,res)=>{
    res.status(234).send("welcome")
})

app.use('/books',booksRoute)// all reuest to books will go here

// //Route to save new book
// app.post('/books',async(req,res)=>{
// try {
//     if(!req.body.title || !req.body.author || !req.body.publishYear){
//         return res.status(400).send({message:'Send all required fields : title, author, publishing year'})
//     }

//     const newBook={
//         title:req.body.title,
//         author:req.body.author,
//         publishYear:req.body.publishYear
//     }

//     const book= await Book.create(newBook)

//     return res.status(201).send(book)
// } catch (error) {
//     console.log(error.message);
//     res.status(500).send({message:error.message});
// }
// })


// //Route to get new book
// app.get('/books',async(req,res)=>{
//     try {
//         const books=await Book.find({});
//         return res.status(200).send({
//             count:books.length,
//             data:books
//         });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message})
//     }
// })

// //Route to get book by id
// app.get('/books/:id',async(req,res)=>{
//     try {
//         const {id}=req.params;
//         const book=await Book.findById(id);
//         return res.status(200).send(book);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message})
//     }
// })

// //Route to update a book
// app.put('/books/:id',async(req,res)=>{
//     try {
//         if(!req.body.title || !req.body.author || !req.body.publishYear){
//             return res.status(400).send({message:'Send all required fields : title, author, publishing year'})
//         }
//         const {id}=req.params;
//         const result=await Book.findByIdAndUpdate(id,req.body);
//         if(!result) return res.status(404).send({message:'Book not found'});
//         return res.status(200).send({message:'Book updated successfully'});
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error.message});
//     }
// })

// app.delete('/books/:id',async(req,res)=>{
//     try {
//         const {id}=req.params;
//         const result= await Book.findByIdAndDelete(id);
//         if(!result) return res.status(404).send({message:'Book not found'});
//         return res.status(200).send({message:'Book deleted successfully'});
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message:error})  
//     }
// })

mongoose.connect(url)
.then(()=>{
   console.log( "App connected to the database");
   app.listen(port,()=>{   //express runs only when app are connected with the db
    console.log(`server running on ${port}`);
   })
})
.catch((err)=>{console.log(err)});