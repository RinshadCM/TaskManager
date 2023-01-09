// This file will handlle connection logic to the MongoDB DAtabase

const mongoose=require('mongoose')

mongoose.Promise=global.Promise
mongoose.set("strictQuery", false);
mongoose.connect('mongodb://localhost:27017/TaskManager',{useNewUrlParser:true}).then(()=>{
    console.log('Connected to MongoDB Successfully');
}).catch((e)=>{
    console.log('Error while attempting to MongoDB');
    console.log(e);
})

// // To prevent deprectation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);


module.exports = {
    mongoose
};