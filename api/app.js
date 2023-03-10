const express= require('express')
const app= express()

const {mongoose}=require('./db/mongoose')

const bodyParser=require('body-parser')

// Load in the mongoose models
const { List,Task }= require('./db/models')

// Load Middleware
app.use(bodyParser.json())

// List Routes
app.get('/lists',(req,res)=>{
    // We want to return an array of all the lists in the database
    List.find({}).then((lists)=>{
        res.send(lists)
    })

})

app.post('/lists',(req,res)=>{
    // We want to create a new list document back to the user(which includes the id)
    // The list information(fields) will be passed in via the JSOn request body
    let title=req.body.title

    let newList=new List({
        title
    })
    newList.save().then((listDoc)=>{
        // The full list document is returned(Include id)
        res.send(listDoc)
    })
})

app.patch('/lists/:id',(req,res)=>{
    // We want to update the specified list (list document with id in URL) with the new values specified in the JSON body of the request
    List.findOneAndUpdate({_id: req.params.id},{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200)
    })
})

app.delete('/lists/:id',(req,res)=>{
    // We want to delete the specified list(document with id in the URL)
    List.findByIdAndRemove({
        _id:req.params.id
    }).then((removedListDoc)=>{
        res.send(removedListDoc)
    })
})



// Get all tasks in a specified list
app.get('/lists/:listId/tasks',(req,res)=>{
    // We want to return all tasks belong to a specific list(by listId)
    Task.find({
        _listId:req.params.listId
    }).then((tasks)=>{
        res.send(tasks)
    })
})

app.post('/lists/:listId/tasks',(req,res)=>{
    // We want to create a new task in a list specified by listId
    let newTask=new Task({
        title:req.body.title,
        _listId:req.params.listId

    })
    newTask.save().then((newTaskDoc)=>{
        res.send(newTaskDoc)
    })
})

app.patch('/lists/:listId/tasks/:taskId',(req,res)=>{
    // We want to update an existing task (Specified by taskId)
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    },{
        $set: req.body
    }).then(()=>{
        res.sendStatus(200)
    })
})

app.delete('/lists/:listId/tasks/:taskId',(req,res)=>{
    // We want to delete a task
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId:req.params.listId
    }).then((removedTaskDoc)=>{
        res.send(removedTaskDoc)
    })
})




app.listen(3000,()=>{
    console.log("Server listening at port 3000");
})