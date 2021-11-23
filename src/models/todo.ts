const  mongoose = require('mongoose');

interface ITodo{
    title:string;
    description:string;
}

//The above code is how we create an interface in typescript, 
//the ITodo is a contract which defines the properties and the data types that are required in our Todo. 
//We have only defined this interface, we are not using it yet.


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

todoSchema.statics.build = (attr:ITodo)=>{
    return new Todo(attr)
}

const Todo = mongoose.model('Todo',todoSchema);

// const build = (attr:ITodo)=>{
//     return new Todo(attr)
// }

export { Todo }
