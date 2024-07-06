import express from 'express';
import cors from 'cors';
import  roomRouters from './Routers/roomRouters.js';


const app = express();
const PORT=400;

app.use(cors());
app.use(express.json());

app.use('/api',roomRouters)


app.get('/',(req,res) =>
    {
    res.status(200).send("Welcome to Rooms booking app")
})

app.listen(PORT,()=>
    {
        console.log(`server is running on port ${PORT}`)
    })
