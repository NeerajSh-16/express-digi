import express from 'express'

const port = 3000;

const app = express();
app.use(express.json())

let teaData = [];
let nextId = 1;

//add a new tea
app.post('/teas', (req, res) => {
    const {name, price} = req.body;
    const newData = {id: nextId++, name, price};
    teaData.push(newData)
    res.status(201).send(newData)
})
//To display all the teas
app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})
//get a particular tea with an id
app.get('/teas/:id',(req, res) => {
    const tea = teaData.findIndex( t => t.id === parseInt(req.params.id))
    //if you say 'teas/:superman' then you have look for req.params.superman
    //we used parseInt b/c anything that comes from the url is in the string format
    if(!tea){
        res.status(404).send('Tea not found')
    }else{
        res.send(200).send(tea);
    }
})
//update
app.put('/teas/:id',(req,res) => {
    const teaId = req.params.id
    const tea = teaData.find(t => t.id === parseInt(teaId))
    if(!tea){
        res.status(404).send('Tea not found !')
    }else{
        const {name, price} = req.body
        tea.name = name;
        tea.price =  price;
        res.status(200).send(tea)
    }
})
//delete
app.delete('/teas/:id',(req,res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if(index === -1){
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index, 1);
    return res.status(204).send('Tea deleted !!')
})

//if anything comes in the body you say req.body
//if anything comes in the url you say req.params

app.listen(port, () => {
    console.log(`Server is running at the port ${port}`)
})
//command to run =? npm run start
/**
 * in order to avoid restarting my server again and again whenever i made any change to my code I have to install a developer dependency called called as 'nodemon', which is purely used for the development purpose and doesn't need to be send for the production
 * 1) In order to install the node 'nodmon' run this command in your PWD
 * npm i -D nodemon
 * 
 * 2) After that you've to update your scripts in package.json by adding => "dev": "nodemon index.js"
 * 
 */