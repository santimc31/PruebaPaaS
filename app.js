const express = require('express');
const (CosmosClient)=require('@azure/cosmos');
const app = express();
const port = process.env.PORT || 3000;

//Configuracion de Cosmos DB
const cosmosClient = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
const database = cosmosClient.database('academic-db');
const container=database.container('student');
app.use(express.json());

//Ruta para insertar datos
app.post('/student',async(req,res)=>(
    try{
        const(body)= req;
        const(resource:createdItem)=await container.items.create(body);
        res.status(201).send(createdItem);
    }catch(error){
    res.status(500).send(error);
    }    
));

//Ruta para consultar datos
app.get('/students',async(req,res)=>(
    try{
        const(resources)=await container.items.readAll().fetchAll();
        res.status(200).send(createdItem);
    }catch(error){
        res.status(500).send(error);
    }    
));

app.get('/', (req, res) => {
    res.send('Hola estamos en SENATI desplegando nuestro PaaS 2025');
});



app.listen(port, () => {
    console.log('Aplicación escuchando en el puerto ${port}');
});
