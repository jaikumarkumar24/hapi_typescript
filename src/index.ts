import { Server, Request, ResponseToolkit } from "@hapi/hapi";


//Database configuration
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/CRUD_App', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err));

const Todo = require('./models/todo');


const init = async () => {
    const server: Server = new Server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path: '/',
        handler: (request: Request, h: ResponseToolkit) => {
            return 'Hello World!';
        }
    });

    server.route({
        method:'POST',
        path:'/api/todo',
        handler: async (request, h)=>{
            let info = request.payload; 
            let newInfo = new Todo(info);
        }
    });


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();